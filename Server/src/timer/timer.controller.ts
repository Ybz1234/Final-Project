import { Request, Response } from "express";
import fetch from "node-fetch";

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

export async function sendScheduledNotification(req: Request, res: Response) {
    try {
        const { startDate, expoPushToken } = req.body;

        if (!expoPushToken) {
            return res.status(400).json({ error: "Missing Expo Push Token" });
        }

        // Schedule notification 1 minute after booking
        scheduleNotification(
            "Thank you for your booking!",
            "We’re looking forward to your trip!",
            expoPushToken,
            new Date(Date.now() + 60 * 1000) // One minute from now
        );

        // Schedule notification on vacation start date
        if (startDate) {
            scheduleNotification(
                "Your vacation starts soon!",
                "Enjoy your journey!",
                expoPushToken,
                startDate
            );
        }

        console.log(`Notifications scheduled: 1 minute after booking and on start date: ${startDate}`);
        res.status(200).json({ message: "Notifications scheduled successfully" });
    } catch (error) {
        console.error("Error scheduling notification:", error);
        res.status(500).json({ error: "Failed to schedule notifications" });
    }
}

async function scheduleNotification(title: string, body: string, expoPushToken: string, date: string | Date) {
    const schedulingDate = new Date(date);
    const delay = schedulingDate.getTime() - Date.now();

    if (delay > 0) {
        setTimeout(async () => {
            try {
                const response = await fetch(EXPO_PUSH_URL, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        to: expoPushToken,
                        sound: "default",
                        title,
                        body,
                        data: { message: `${title} - ${body}` },
                    }),
                });

                const result: unknown = await response.json();
                if (typeof result === "object" && result !== null && "data" in result) {
                    console.log(`Notification sent: ${title} on ${schedulingDate}`);
                } else {
                    console.error("Failed to send notification:", result);
                }
            } catch (error) {
                console.error("Error sending notification:", error);
            }
        }, delay);
    } else {
        console.log(`Notification date ${schedulingDate} is in the past; skipping notification.`);
    }
}
