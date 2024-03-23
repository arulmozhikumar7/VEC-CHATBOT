// server.js
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const witResponse = await getWitAiResponse(userMessage);
    const botResponse = handleWitAiResponse(witResponse);

    res.json({ botResponse });
  } catch (error) {
    console.error("Error handling chat request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function getWitAiResponse(userInput) {
  const witApiKey = "AB7QFP5R3AYSWHZROJ3PJSL5D6UTJULP";
  const q = encodeURIComponent(userInput);
  const witApiUrl = "https://api.wit.ai/message?v=20230215&q=" + q;

  const response = await axios.get(witApiUrl, {
    headers: {
      Authorization: `Bearer ${witApiKey}`,
    },
  });
  console.log(response.data);
  return response.data;
}
function handleWitAiResponse(witResponse) {
  const intent = witResponse.intents[0]?.name;

  if (intent === "Courses") {
    return (
      "Here are the courses you can take:\n" +
      "- Artificial Intelligence and Data Science\n" +
      "- Automobile Engineering\n" +
      "- Civil Engineering"
    );
  } else if (intent === "Admission_Info") {
    return "Here is the admission process";
  } else if (intent === "Greeting") {
    return "Hello, I am a bot. How can I help you?";
  } else if (intent === "Fee") {
    return "For Fee Structure, you can call 9123547550.";
  } else if (intent === "Location") {
    return (
      "The college is located at Ambattur Red Hills Rd, Velammal Nagar, Surapet, Chennai, Tamil Nadu 600066. " +
      `You can find the exact location on Google Maps <a href="https://maps.app.goo.gl/TUwYsHmE7MK4uc8U8" target="_blank" rel="noopener noreferrer">Click here</a>.
            `
    );
  } else if (intent === "departments") {
    return (
      "Departments:\n" +
      "- Artificial Intelligence and Data Science (AI&DS)\n" +
      "- Automobile Engineering (AE)\n" +
      "- Chemistry\n" +
      "- Civil Engineering (CE)\n" +
      "- Computer Science and Engineering (CSE)\n" +
      "- Computer Science and Engineering (CYBER SECURITY)\n" +
      "- Electrical and Electronics Engineering (EEE)\n" +
      "- Electronics & Communication Engineering (ECE)\n" +
      "- Electronics and Instrumentation Engineering (EIE)\n" +
      "- English\n" +
      "- Information Technology (IT)\n" +
      "- Master of Business Administration (MBA)\n" +
      "- Mathematics\n" +
      "- Mechanical Engineering (ME)\n" +
      "- Physics"
    );
  } else if (intent === "Scholarship") {
    return `
      For information about scholarships, you can download the scholarship form PDF <a href="http://velammal.edu.in/wp-content/uploads/2021/12/BC-MBC-Scholarship-Form-Fresh.pdf" target="_blank" rel="noopener noreferrer">here</a>.
    `;
  } else if (intent === "faculty_cse") {
    return `
     <p>1. Dr. B. Murugeshwari - Professor & Head - M.E., Ph.D.</p>
<p>2. Dr. A. Balaji Ganesh - Professor & Dean - R&D - M.S., Ph.D.</p>
<p>3. Dr. V. Jeyabalaraja - Professor - M.E., Ph.D.</p>
<p>4. Dr. Jeevaa Katiravan - Professor - M.Tech., Ph.D.</p>
<p>5. Dr. S. Gunasundari - Professor - M.E., Ph.D.</p>
<p>6. Dr. P. S. Smitha - Associate Professor - M.E., Ph.D.</p>
<p>7. Dr. P. Pritto Paul - Associate Professor - M.E., Ph.D.</p>
<p>8. Dr. M. Usha - Associate Professor - M.E., Ph.D.</p>
<p>9. Dr. A. Lakshmi Sangeetha - Associate Professor - M.E., Ph.D.</p>
<p>10. Dr. S. Rajalakshmi - Assistant Professor (G -III) - M.E., Ph.D.</p>
<p>11. Mrs. T. Subashini - Assistant Professor (G -III) - M.E.</p>
<p>12. Mrs. B. Hemalatha - Assistant Professor (G -III) - M.E.</p>
<p>13. Ms. M. Vijayalakshmi - Assistant Professor (G -III) - M.Tech., (Ph.D.)</p>
<p>14. Dr. A. Rajeswari - Assistant Professor (G -III) - M.Tech., Ph.D.</p>
<p>15. Mr. K. Sundar - Assistant Professor (G -II) - M.E., (Ph.D.)</p>
<p>16. Mrs. S. Sridevi - Assistant Professor (G -II) - M.E., M.B.A., (Ph.D.)</p>
<p>17. Mrs. R. Amirthavalli - Assistant Professor (G -II) - M.E., (Ph.D.)</p>
<p>18. Mrs. K. Mohanambal - Assistant Professor (G -II) - M.E.</p>
<p>19. Mr. Dhakshunhaamoorthiy - Assistant Professor (G -II) - M.E., (Ph.D.)</p>
<p>20. Mrs. K. C. Aarthi - Assistant Professor (G - I) - M.Tech.</p>
<p>21. Mrs. S. Babitha Rani - Assistant Professor (G - I) - M.E.</p>
<p>22. Mrs. D. Daya Florance - Assistant Professor (G - I) - M.E.</p>
<p>23. Mrs. P. Rajeshwari - Assistant Professor (G - I) - M.E.</p>
<p>24. Mrs. C. Rohini - Assistant Professor (G - I) - M.E.</p>
<p>25. Mrs. S. Bama - Assistant Professor (G - I) - M.E.</p>
<p>26. Mrs. A. Jayanthi - Assistant Professor (G - I) - M.E.</p>
<p>27. Mrs. S. Kayalvizhi - Assistant Professor (G - I) - M.E.</p>
<p>28. Mrs. C. Bharathi Sri - Assistant Professor (G - I) - M.E.</p>
<p>29. Mrs. S. Aminta Sabatini - Assistant Professor (G - I) - M.E.</p>
<p>30. Mrs. S. Almelu - Assistant Professor (G - I) - M.E.</p>
<p>31. Mrs. Lovelit Jose - Assistant Professor (G - I) - M.Tech.</p>
<p>32. Mrs. D. Saral Jeeva Jothi - Assistant Professor (G - I) - M.E.</p>
<p>33. Ms. P. Saranya - Assistant Professor (G - I) - M.E.</p>
<p>34. Ms. C. Sruthi Nath - Assistant Professor (G - I) - M.E.</p>

    `;
  } else if (intent === "faculty_it") {
    return `<p>Dr.JEEVAA KATIRAVAN,  Professor and Head</p>`;
  } else if (intent === "thank_you") {
    return "You're welcome! If you have any more questions or need assistance, feel free to ask. Happy to help!";
  } else if (intent === "admission_documents") {
    return "TNEA Allotment order" + "12th mark sheet" + "11th mark sheet";
  } else {
    return "I'm sorry, I didn't understand that. Please try again.";
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
