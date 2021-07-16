# My Business Note Main App

My Business Note is One page app built on React/Redux. This application integrates with MBN api which is built on Laravel.

## Installation

### Step 1

Begin by cloning this repository to your machine, and installing all npm dependencies.

```
git clone git@github.com:limvus/mybusinessnote-frontend.git
cd mybusinessnote-frontend
npm install
```

### Step 2

Copy .env.example to .env and update the constants.

```
cp .env.example .env
```

### Step 3: docker method

Use docker to run production build

```
npm run build
docker-compose up -d
```

### Step 3: dev method

Use npm server to run development build

```
npm start
```
