# Community Poll Engine

This application analyzes community poll data from text files to find the winning choice and list all voters who selected it.

## Technical Motivations

### 1. What advantages does this language offer for solving this problem?
I chose **TypeScript** because it provides strong typing. This ensures that data like User IDs and names are handled correctly throughout the app, catching errors during development rather than at runtime. It makes the code more reliable and easier to maintain.

### 2. In what ways does the language make it more difficult to solve this problem?
TypeScript requires more initial boilerplate code because you have to define data structures (interfaces) before using them. While this takes a little more time upfront, it prevents bugs later on.

### 3. Why did you select this particular language to solve the problem?
TypeScript is the industry standard for modern web applications. It allows for a fast development cycle while ensuring high code quality. It is the best choice for building a professional, production-ready tool.

### 4. Did you do anything to make the solution run faster?
Yes. I implemented an **O(N) linear complexity** algorithm. Instead of searching through the list multiple times, the app creates a "Hash Map" of all users. This means the app only looks at each piece of data once, making the analysis instant even for very large files.

### 5. How is the list sorted?
The list of voters for the winning color is sorted alphabetically. It first sorts by **Surname**, and then by **First Name** if surnames are the same. This ensures the output is always organized and easy to read.

## How to Run

### Requirements
* **Node.js** (Latest version)
* **npm**

### Setup
1. Open the project folder in **Visual Studio Code**.
2. Open your terminal and run:
   ```bash
   npm install
   ```

### Running the App
Start the development server:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.
