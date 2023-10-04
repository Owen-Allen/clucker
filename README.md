# Clucker
Clucker is a text-based social media app where people can share short messages, called clucks, with the world. User's can create a custom profile, follow their friends, share their ideas and like other clucks.

[Live website](https://clucker.vercel.app/)

<p float="left">
<img alt="Image of feed" src="https://github.com/Owen-Allen/clucker/blob/main/images/feed.jpg" width="200">
<img alt="Image of cluck form" src="https://github.com/Owen-Allen/clucker/blob/main/images/cluck.jpg" width="200">
<img alt="Image of profile" src="https://github.com/Owen-Allen/clucker/blob/main/images/profile.jpg" width="200">
<img alt="Image of followers list" src="https://github.com/Owen-Allen/clucker/blob/main/images/followers.jpg" width="200">
<img alt="Image of login" src="https://github.com/Owen-Allen/clucker/blob/main/images/login.jpg" width="200">
</p>


## Table of Contents

- [Clucker](#clucker)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Django Backend Setup](#django-backend-setup)
    - [Next.js Frontend Setup](#nextjs-frontend-setup)
  - [Future Plans](#future-plans)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)
  - [Resources](#resources)
    - [Tools and Libraries](#tools-and-libraries)
    - [Helpful Guides and Relevant Discussions](#helpful-guides-and-relevant-discussions)


## Tech Stack

### Frontend:

- Next.js and TypeScript: The frontend is built using Next.js, a popular React framework, with TypeScript for strong typing and a better dev experience.
- Tailwind CSS and shadcn/ui: I used TailwindCSS for custom styling built ontop of components designed at shadcn

### Backend
- Django Rest Framework: The backend uses the Django Rest Framework for handling CRUD operations with the SQLite database.
- NextAuth.js: To ensure secure sign-in authentication, we've integrated NextAuth.js, enabling Google sign-in and JWT (JSON Web Token) handling.

### Hosting:
- AWS Elastic Beanstalk: The backend is hosted on AWS Elastic Beanstalk
- Vercel (Free Tier): For the frontend, I used Vercel's free tier hosting

## Installation

### Django Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Owen-Allen/clucker.git
   cd clucker
   ```

2. **Create and activate a virtual environment for Django:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install required Python packages:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create an empty database:**
   ```bash
   python manage.py migrate
   ```

5. **Start the backend server:**
   ```bash
   python manage.py runserver
   ```
   Access it at [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

6. **To access the admin portal, create a superuser:**
   ```bash
   python manage.py createsuperuser
   ```
   Access the admin portal at [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin).

### Next.js Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Ensure you have Node.js version 16.14.0 or above. If not, I recommend using [nvm](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/).**

3. **Install required Node.js modules:**
   ```bash
   npm install
   ```

4. **Run the frontend in development mode:**
   ```bash
   npm run dev
   ```
   Access it at [http://localhost:3000/](http://localhost:3000/)

5. **Create an OAuth 2.0 Client in the Google Cloud Console. I recommend following [this video](https://www.youtube.com/watch?v=roxC8SMs7HU&ab_channel=CooperCodes) for a simple walkthrough.**

6. **Create a `.env` file in the `~/clucker/frontend` directory with the following variables:**
   ```bash
   GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
   GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
   NEXTAUTH_SECRET=CREATE_A_NEXT_AUTH_SECRET
   NEXTAUTH_URL=http://localhost:3000
   DB_HOST=http://127.0.0.1:8000
   ```

7. **Run the application again using:**
   ```bash
   npm run dev
   ```
   You can now create an account and start Clucking!


## Future plans
- Backend refactor for streamlined syntax
- Cluck delete feature
- Reply feature implementation on frontend
- Backend migration to [planetscale.com](planetcale.com) for free backend hosting

## Author

- I'm Owen. I'm a Software Developer and a Carleton Computer Science graduate. You reach me by email me at owenallen.2000@gmail.com

## Acknowledgments

- Special thank you to Nina Tostevin for coming up with the name of the app and encouraging me to pursue this project.

## Resources

### Tools and Libraries
- [Django](https://www.djangoproject.com/)
- [Next.JS](https://nextjs.org/)
- [NextAuth.JS](https://next-auth.js.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)

### Helpful guides and relevant discussions
- [How to implement Google Identity Services](https://www.youtube.com/watch?v=roxC8SMs7HU&ab_channel=CooperCodes)
- [Discussion on securing a NextJS and Django application](https://github.com/nextauthjs/next-auth/discussions/1350)
- [Elastic Beanstalk deployment by AWS](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create-deploy-python-django.html)
- [SSL Certificates and Registering Route 53 Domain](https://www.youtube.com/watch?v=BeOKTpFsuvk&ab_channel=WornOffKeys)
- [Understanding JSON Web Tokens](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/#Token-Types)

