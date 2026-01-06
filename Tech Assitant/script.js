const chatBox = document.getElementById("chatBox");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function processInput() {
  const input = document.getElementById("userInput").value.trim();
  if (!input) return;

  addMessage("User: " + input, "user");
  document.getElementById("userInput").value = "";

  setTimeout(() => {
    const response = analyzeInput(input);
    addMessage("Assistant: " + response, "bot");
  }, 500);
}

function analyzeInput(input) {
  input = input.toLowerCase();

  // 🔍 Error Detection
  if (input.includes("error") || input.includes("referenceerror")) {
    return analyzeError(input);
  }

  // 🧠 Code Detection
  if (input.includes("for(") || input.includes("while(") || input.includes("function")) {
    return analyzeCode(input);
  }

  // 📘 Concept Explanation
  if (input.includes("closure")) {
    return "A closure is a function that remembers variables from its outer scope even after the outer function has finished execution.";
  }

  if (input.includes("chatbot")) {
    return "This system is not a chatbot. It is a technical assistant that analyzes code, errors, and programming concepts using JavaScript logic.";
  }

  return "I analyze technical inputs like code, errors, and concepts. Please provide something technical.";
}

// 🧪 Code Analyzer
function analyzeCode(code) {
  let response = "Code Analysis:\n";

  if (code.includes("for(")) {
    response += "- Detected a FOR loop\n";
    response += "- Executes repeatedly until condition becomes false\n";
  }

  if (code.includes("console.log")) {
    response += "- Outputs values to the console\n";
  }

  response += "- Suggestion: Use proper variable declarations (let/const)\n";
  return response;
}

// 🚨 Error Analyzer
function analyzeError(error) {
  if (error.includes("not defined")) {
    return "ReferenceError detected: A variable is used before being declared. Declare it using let, const, or var.";
  }

  return "General error detected. Check syntax and variable scope.";
}
