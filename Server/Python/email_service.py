import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email_validator import validate_email, EmailNotValidError

SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USERNAME = 'travelAndFlyEurope@gmail.com'
SMTP_PASSWORD = 'oyaa hkmg fosg cgvg'


def validate_recipient_email(to_email):
    try:
        valid = validate_email(to_email)
        return valid.email
    except EmailNotValidError as e:
        print(f"Invalid email address: {str(e)}")
        return None


def create_email_message(to_email, user_name):
    """Create the email message."""
    subject = "Welcome to Our Service"
    body = f"""
    Hi {user_name},

    Welcome to our service! We are thrilled to have you on board. 

    Here are some steps to get you started:
    - Step 1: Choose your preferred destinations.
    - Step 2: Select your preferred dates.
    - Step 3: Fly with confidence.

    If you have any questions or need assistance, feel free to reach out to our support team.

    Best regards,
    The Team
    """

    msg = MIMEMultipart()
    msg['From'] = SMTP_USERNAME
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    return msg


def send_email(msg):
    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(msg['From'], msg['To'], msg.as_string())
        server.quit()
        print(f'Welcome email sent successfully to {msg["To"]}')
    except Exception as e:
        print(f'Failed to send email: {str(e)}')


def send_welcome_email(to_email, user_name):
    to_email = validate_recipient_email(to_email)
    if not to_email:
        return

    msg = create_email_message(to_email, user_name)
    send_email(msg)
