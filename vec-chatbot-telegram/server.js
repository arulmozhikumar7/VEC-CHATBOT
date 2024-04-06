const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");
const path = require("path");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

const telegramToken = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(telegramToken, { polling: true });
app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));
app.use(cors());
app.use(bodyParser.json());
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
function handleWitAiResponse(witResponse, chatId) {
  const intent = witResponse.intents[0]?.name;
  switch (intent) {
    case "Courses":
      return "1. Artificial Intelligence and Data Science\n2. Automobile Engineering\n3. Civil Engineering\n4. Computer Science & Engineering\n5. Computer Science & Engineering (CYBER SECURITY)\n6. Electrical & Electronics Engineering\n7. Electronics and Communication Engineering\n8. Electronics & Instrumentation Engineering\n9. Master of Business Administration\n10. Mechanical Engineering\n11. Information Technology\n";
    case "Admission_Info":
      return "Here is the admission process";
    case "Greeting":
      return "Hello, I am a College Query Bot . You can ask your questions about college.";
    case "Fee":
      return "For Fee Structure, you can call 9123547550.";
    case "Location":
      return (
        "The college is located at Ambattur Red Hills Rd, Velammal Nagar, Surapet, Chennai, Tamil Nadu 600066. " +
        "You can find the exact location on Google Maps https://maps.app.goo.gl/TUwYsHmE7MK4uc8U8"
      );
    case "departments":
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
    case "Scholarship":
      bot.sendDocument(chatId, "./pdfs/BC-MBC-Scholarship-Form-Fresh.pdf", {
        caption:
          "For information about scholarships, you can download the scholarship form PDF here.",
      });
      return "";
    case "faculty_cse":
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
    case "faculty_it":
      return `<p>Dr.JEEVAA KATIRAVAN,  Professor and Head</p>`;
    case "thank_you":
      return "You're welcome! If you have any more questions or need assistance, feel free to ask. Happy to help!";
    case "admission_documents":
      return "TNEA Allotment order" + "12th mark sheet" + "11th mark sheet";
    case "duplicate_hallticket":
      bot.sendDocument(
        chatId,
        "./pdfs/Application-for-Duplicate-Hall-Ticket.pdf",
        {
          caption: "Duplicate Hallticket Application Form",
        }
      );
      return "";
    case "Transport":
      bot.sendDocument(chatId, "./pdfs/TRANSPORT-ROUTE.pdf", {
        caption:
          "Explore the convenience of our college's bus services, covering various routes to ensure easy access for students!",
      });
      return "";
    case "TNEA":
      return "The TNEA code assigned to the college is 1120.";

    case "Placements":
      const placementsMessage =
        "For all inquiries related to placements, please <a href='https://velammal.edu.in/placements/' target='_blank' rel='noopener noreferrer'>click here ↗</a>.";
      bot.sendMessage(chatId, placementsMessage, { parse_mode: "HTML" });
      return "";
    case "Library":
      const libraryMessage =
        "The college library is in the Bill Gates Block and is occupied in the Ground and First floor of the building. Our Library is Spacious, well ventilated well lighted with a total floor area of 24000 square feet. The Library contains more than 77525 Volumes of  books and 25156 different titles in the discipline of Computer Science, Electronics, Electricals, Instrumentation, Mechanical, Automobile, Civil, Artificial Intelligence& Data Science and Business Administration and 174 National and International Journals and More than 9517 online Journals.\n\nWorking Days : 8.00 AM to 6.00 PM\nAll Holidays : 8.00 AM to 5.00 PM (Except Govt. Holidays)\nVacation Period : 8:00 AM to 5:00 PM";
      bot.sendMessage(chatId, libraryMessage, { parse_mode: "HTML" });
      return "";
    case "Ok":
      return "If you have any more questions or need assistance, feel free to ask. Happy to help!";
    case "Exam_Time_Table":
      const examTimeTableMessage =
        "You can find all the exam time tables <a href='https://velammal.edu.in/controller-of-examinations-coe/' target='_blank' rel='noopener noreferrer'>here ↗</a>.";
      bot.sendMessage(chatId, examTimeTableMessage, { parse_mode: "HTML" });
      return "";
    default:
      return "I'm sorry, I didn't understand that. Please try again.";
  }
}
// Handle incoming messages from Telegram
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  try {
    bot.sendChatAction(chatId, "typing");
    const witResponse = await getWitAiResponse(userMessage);
    const botResponse = handleWitAiResponse(witResponse, chatId);

    if (botResponse.length > 0) {
      bot.sendMessage(chatId, botResponse);
    }
    // Send bot response back to the user on Telegram
  } catch (error) {
    console.error("Error handling chat request:", error);
    bot.sendMessage(chatId, "Internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
