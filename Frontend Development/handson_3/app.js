{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ courses \} from "./data.js";\
\
/*\
    TASK 1: ES6+ Syntax Practice\
*/\
\
// Destructuring\
courses.forEach((course) => \{\
    const \{ name, credits \} = course;\
    console.log(`$\{name\} has $\{credits\} credits`);\
\});\
\
// map()\
const formattedCourses = courses.map(\
    (\{ code, name, credits \}) =>\
        `$\{code\} \'97 $\{name\} ($\{credits\} credits)`\
);\
\
console.log("Formatted Courses:");\
console.log(formattedCourses);\
\
// filter()\
const highCreditCourses = courses.filter(\
    (course) => course.credits >= 4\
);\
\
console.log(\
    "Courses with 4 or more credits:",\
    highCreditCourses.length\
);\
\
// reduce()\
const totalCredits = courses.reduce(\
    (total, course) => total + course.credits,\
    0\
);\
\
console.log("Total Credits:", totalCredits);\
\
\
/*\
    TASK 2: DOM Selection and Dynamic Rendering\
*/\
\
const courseGrid = document.querySelector(".course-grid");\
\
const totalCreditsElement =\
    document.querySelector("#total-credits");\
\
const selectedCourse =\
    document.querySelector("#selected-course");\
\
\
const renderCourses = (courseList) => \{\
\
    courseGrid.innerHTML = "";\
\
    courseList.forEach((course) => \{\
\
        const article =\
            document.createElement("article");\
\
        article.className = "course-card";\
\
        article.dataset.id = course.id;\
\
        article.innerHTML = `\
            <h3>$\{course.name\}</h3>\
            <p>Course Code: $\{course.code\}</p>\
            <p>Credits: $\{course.credits\}</p>\
        `;\
\
        courseGrid.appendChild(article);\
    \});\
\};\
\
\
// Initial rendering\
\
renderCourses(courses);\
\
\
// Display total credits\
\
totalCreditsElement.textContent =\
    `Total Credits Enrolled: $\{totalCredits\}`;\
\
\
/*\
    TASK 3: Event Listeners and Interactivity\
*/\
\
// Search functionality\
\
const searchInput =\
    document.querySelector("#search-courses");\
\
searchInput.addEventListener("input", (event) => \{\
\
    const searchTerm =\
        event.target.value.toLowerCase();\
\
    const filteredCourses =\
        courses.filter((course) =>\
            course.name\
                .toLowerCase()\
                .includes(searchTerm)\
        );\
\
    renderCourses(filteredCourses);\
\});\
\
\
// Sort by credits\
\
const sortButton =\
    document.querySelector("#sort-credits");\
\
sortButton.addEventListener("click", () => \{\
\
    const sortedCourses =\
        [...courses].sort(\
            (a, b) => b.credits - a.credits\
        );\
\
    renderCourses(sortedCourses);\
\});\
\
\
// Event Delegation\
\
courseGrid.addEventListener("click", (event) => \{\
\
    const card =\
        event.target.closest(".course-card");\
\
    if (!card) return;\
\
    const courseId =\
        Number(card.dataset.id);\
\
    const course =\
        courses.find(\
            (course) => course.id === courseId\
        );\
\
    selectedCourse.textContent =\
        `Selected Course: $\{course.name\} | Grade: $\{course.grade\}`;\
\});}