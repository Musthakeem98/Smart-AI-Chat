# n8n AI Agent Application

This is a simple guide to get your **n8n AI Agent Application** up and running locally using **Docker**. Follow the steps carefully to start using the application.

---

## **Prerequisites**

- [Node.js](https://nodejs.org/) installed  
- [Docker](https://www.docker.com/) installed  
- [Docker Compose](https://docs.docker.com/compose/) installed  
- Basic knowledge of terminal/command prompt  

---

## **Installation & Setup**

### 1. Clone the repository
```
bash
git clone <your-repo-url>
```

### 2. Navigate to the project directory
```
bash
cd <your-repo-folder>
```

### 3. Install dependencies
```
bash
npm install
```

### 4. Start n8n using Docker Compose
```
bash
docker compose up -d
```
This will start n8n in a Docker container and expose it on **http://localhost:5678**.

---

## **Configure n8n**

1. Open your browser and visit the n8n web interface:
```
text
http://localhost:5678
```

2. In the root directory of the project, locate the `n8n.json` file.

3. Import the `n8n.json` file in n8n:
   - Click **Import** in n8n  
   - Select `n8n.json`  
   - This will load all pre-configured workflows, including your AI agent workflow

---

## **Using the Application**

- Once the workflows are imported, you can:
  - Trigger AI agents via webhooks  
  - Connect external services like email, Google Sheets, or APIs  
  - Start automations and see real-time execution in n8n  

- Make sure to check workflow logs and test triggers to ensure everything is working properly.

---

## **Tips**

- You can stop the Docker containers anytime using:
```
bash
docker compose down
```

- To view logs of n8n:
```
bash
docker compose logs -f
```

- You can customize workflows inside n8n after import according to your requirements.

---

## **Support**

If you encounter issues:
- Make sure Docker and Docker Compose are running  
- Check the n8n logs for errors  
- Ensure your system meets all prerequisites

---

Enjoy your **n8n AI Agent Application**! 🚀
