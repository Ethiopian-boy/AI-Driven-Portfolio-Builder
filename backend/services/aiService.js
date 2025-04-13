// aiServices.js
const { OpenAI } = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const generatePortfolioInsights = async (portfolioData) => {
  try {
    const prompt = `Analyze this portfolio and provide specific recommendations to enhance the technical depth and user engagement. Focus on adding detailed project descriptions, quantifiable impact, and visual elements:
Portfolio Data: ${portfolioData ? JSON.stringify(portfolioData, null, 2) : "No portfolio data provided."}
Recommendations:`;

    console.log("Constructed prompt for insights:", prompt);

    const chatCompletion = await client.chat.completions.create({
      model: "deepseek/deepseek-r1-zero:free",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      extra_headers: {},
    });

    const message = chatCompletion.choices[0].message;
    console.log("Raw AI service response (insights):", message);
    // Use the reasoning field exclusively
    const outputText = message.reasoning ? message.reasoning.trim() : "";
    console.log("Final output for insights:", outputText);
    return { content: outputText };
  } catch (error) {
    console.error("Error generating AI insights:", error.response ? error.response.data : error.message);
    throw error;
  }
};

const modifyDocument = async (document, jobDetails = {}) => {
  try {
    const outputType = jobDetails.outputType || "CV";
    const position = jobDetails.position || "[Position]";
    const company = jobDetails.company || "[Company]";
    const jobDescription = jobDetails.jobDescription || "[Job Description]";
    const portfolioData = document.portfolioData
      ? JSON.stringify(document.portfolioData, null, 2)
      : "No portfolio data provided.";
    const recommendations = document.generatedCV || "No recommendations available.";

    let prompt = "";
    if (outputType === "CV") {
      if (document.originalCVUrl) {
        prompt = `Title: CV for: ${position} at ${company}
Content: Update my CV using the original CV at ${document.originalCVUrl} based on the following portfolio data and recommendations.
Portfolio Data: ${portfolioData}
Recommendations: ${recommendations}
Final Updated CV:
Return only the final CV content in Markdown format without any extra commentary.
Append the delimiter "---END---" at the end.
`;
      } else {
        prompt = `Title: CV for: ${position} at ${company}
Content: Generate a professional CV using the portfolio data and recommendations.
Portfolio Data: ${portfolioData}
Recommendations: ${recommendations}
Final Updated CV:`;
      }
    } else if (outputType === "CoverLetter") {
      prompt = `Title: Cover Letter for ${company}: ${position}
Content: Write a customized cover letter based on the following job description and requirements.
Job Description: ${jobDescription}
Final Cover Letter:
Return only the final Cover Letter content in Markdown format without any extra commentary.
Append the delimiter "---END---" at the end.
`;
    } else if (outputType === "Portfolio") {
      const portfolioRecommendations = document.generatedPortfolio || "No recommendations available.";
      if (document.portfolioData) {
        prompt = `Title: Portfolio for [User's Name]
Content: Based on the following portfolio data and recommendations, generate an enhanced portfolio that is clear, professional, and visually engaging. Include sections for Professional Summary, Detailed Projects, Skills, and Contact Information.
Portfolio Data: ${portfolioData}
Recommendations: ${portfolioRecommendations}
Final Enhanced Portfolio:`;
      } else {
        prompt = `Title: Portfolio for [User's Name]
Content: Generate a professional portfolio from scratch using a modern, minimalist template. Include sections for Professional Summary, Detailed Projects, Skills, and Contact Information.
Final Enhanced Portfolio:
Return only the final Portfolio content in Markdown format without any extra commentary.
Append the delimiter "---END---" at the end.
`;
      }
    }

    console.log("Constructed prompt for modification:", prompt);

    const chatCompletion = await client.chat.completions.create({
      model: "deepseek/deepseek-r1-zero:free",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
      temperature: 0.7,
      extra_headers: {},
    });

    const message = chatCompletion.choices[0].message;
    console.log("Raw AI service response (modify):", message);
    // Use the reasoning field exclusively for modifications
    const outputText = message.reasoning ? message.reasoning.trim() : "";
// After obtaining outputText
const delimiter = '---END---';
let cleanedOutput = outputText;
if (outputText.includes(delimiter)) {
  cleanedOutput = outputText.split(delimiter)[0].trim();
}
return { content: cleanedOutput };
  } catch (error) {
    console.error("Error modifying document:", error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = { generatePortfolioInsights, modifyDocument };
