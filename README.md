# ai-oven

![AI Oven](https://raw.githubusercontent.com/hoangvvo/ai-oven/refs/heads/main/docs/image.webp)

AI Oven is a project for the course _Electronic Commerce (CO3027)_ at Ho Chi Minh City University of Technology, Vietnam National University, Ho Chi Minh City. It aims to:

- Build an elegantly-designed e-commerce website for selling baking products.
- Integrate with PayPal for payment.
- Implement an AI feature that can recommend products to users through a chatbot.
- Continously train the AI model with user-provided content (reviews, ratings, etc.) and product information.

## Technologies

- [Node.js](https://nodejs.org/en/)
- [Next.js](https://nextjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Milvus](https://milvus.io/)
- [PayPal](https://developer.paypal.com/home/)

## Getting Started

### Prerequisites

- [Node.js and npm](https://nodejs.org/en/) (Node.js version >= 20)
- [Docker and Docker Compose](https://docs.docker.com/get-started/get-docker/)
- [PayPal Developer Account](https://developer.paypal.com/home/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hoangvvo/ai-oven.git
cd ai-oven
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and fill in the following environment variables:

```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres
POSTGRES_PASSWORD=postgres
MILVUS_HOST=localhost:19530
PAYPAL_CLIENT_ID=<YOUR_PAYPAL_CLIENT_ID>
PAYPAL_CLIENT_SECRET=<YOUR_PAYPAL_CLIENT_SECRET>
JWT_SECRET=<YOUR_JWT_SECRET>
```

4. Start the PostgreSQL and Milvus services:

```bash
docker compose up -d
```

5. Run the migrations:

```bash
npm run migrate
```

6. Start the server:

```bash
npm run dev
```

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
