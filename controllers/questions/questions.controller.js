const { QuestionModel } = require("../../models/questions.models");
const fs = require("fs");
const axios = require("axios");
const cron = require("node-cron");

/*cron.schedule('0 0 * * 0', */async function getData (req, res) {
    try {
        const [response1, response2, response3, response4, response5] = await Promise.all([
            axios.get('https://opentdb.com/api.php?amount=5&category=15&type=multiple'),
            axios.get('https://opentdb.com/api.php?amount=5&category=12&type=multiple'),
            axios.get('https://opentdb.com/api.php?amount=5&category=24&type=multiple'),
            axios.get('https://opentdb.com/api.php?amount=5&category=14&type=multiple'),
            axios.get('https://opentdb.com/api.php?amount=5&category=9&type=multiple')
        ]);
        const fetchedQuestions = [
        ]

        fetchedQuestions.push(response1.data)
        fetchedQuestions.push(response2.data)
        fetchedQuestions.push(response3.data)
        fetchedQuestions.push(response4.data)
        fetchedQuestions.push(response5.data)

        const questionsToSave = [];

        fetchedQuestions.forEach(fetchedQuestion => {
            questionsToSave.push(new QuestionModel({
                category: fetchedQuestion.category,
                difficulty: fetchedQuestion.difficulty,
                question: fetchedQuestion.question,
                correctAnswer: fetchedQuestion.correct_answer,
                incorrectAnswer: fetchedQuestion.incorrect_answer
            }));
        });

        await QuestionModel.insertMany(questionsToSave);

        res.status(200).json("Saved questions to database")
        
        // fs.readFile("weeklyQuestions.json", (err, data) => {
        //     if(err){
        //      res.status(500).json(err)
        //      return;
        //     }
        //     let jsonData = JSON.parse(data);
        //     jsonData.push(fetchedQuestions)

        //     fs.writeFile("weeklyQuestions", JSON.stringify(jsonData), (err) => {
        //         if(err){
        //             return res.status(500).json(err);
        //         }
        //         // cannot read properties of undefined reading 'status'
        //         return res.status(200).json("Successfully written to file!");
        //     });
        // });    
    } catch (err) {
        console.error(err);
    }
};

getData();

async function renderQuestions(){
    await getData();
    
}

// function storeQuestions (req, res) {
//     console.log(questions.data);
//     fs.readFile("weeklyQuestions.json", (err, data) => {
//         if(err){
//             res
//         }
//         let jsonData = JSON.parse(data);
//         jsonData.push(questions)
//         fs.writeFile("weeklyQuestions.json", JSON.stringify(jsonData), null, 2), (err) => {
//             if(err) throw err;
//             res.status(201).json(jsonData)
//         }
//     })
    
// }

module.exports = getData;







// const getData = async () => {
//         const gamingSection = `https://opentdb.com/api.php?amount=5&category=15&type=multiple`;
//         const musicSection = `https://opentdb.com/api.php?amount=5&category=12&type=multiple`;
//         const politicalSection = `https://opentdb.com/api.php?amount=5&category=24&type=multiple`;
//         const televisionSection = `https://opentdb.com/api.php?amount=5&category=14&type=multiple`;
//         const generalSection = `https://opentdb.com/api.php?amount=5&category=9&type=multiple`;

//         const results = await Promise.all([
//             fetch(gamingSection),
//             fetch(musicSection),
//             fetch(politicalSection),
//             fetch(televisionSection),
//             fetch(generalSection)
//         ])
//         const dataPromises = results.map(result => result.json())
//         const finalData = await Promise.all(dataPromises);
//         return finalData;
// };

// async function waitForResponse () {
//     const data = await getData();
//     console.log(data);
// };

// waitForResponse();

// function getAllWeeklyQA(req, res){
//     fs.readFile("weeklyQuestions.json", (err, data) => {
//         if(err){
//             res.status(404).send("Couldn't find questions");
//         }
//         const questionsAnswers = JSON.parse(data)

//         res.status(200).json(questionsAnswers)
//         return;
//     })
// };