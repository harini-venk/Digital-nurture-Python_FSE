{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const API_URL =\
    "https://jsonplaceholder.typicode.com";\
\
\
/*\
    TASK 1\
    Promises and Async/Await\
*/\
\
\
// Promise chaining version\
\
function fetchUser(id) \{\
\
    return fetch(`$\{API_URL\}/users/$\{id\}`)\
        .then((response) => response.json())\
        .then((user) => \{\
            console.log(\
                "Promise User:",\
                user.name\
            );\
\
            return user;\
        \});\
\}\
\
\
// Async/Await version\
\
async function fetchUserAsync(id) \{\
\
    try \{\
\
        const response =\
            await fetch(\
                `$\{API_URL\}/users/$\{id\}`\
            );\
\
        if (!response.ok) \{\
            throw new Error(\
                "Failed to fetch user"\
            );\
        \}\
\
        const user =\
            await response.json();\
\
        console.log(\
            "Async User:",\
            user.name\
        );\
\
        return user;\
\
    \} catch (error) \{\
\
        console.error(error.message);\
\
    \}\
\}\
\
\
// Local course data\
\
const localCourses = [\
\
    \{\
        id: 1,\
        name: "Data Structures",\
        credits: 4\
    \},\
\
    \{\
        id: 2,\
        name: "Web Development",\
        credits: 3\
    \},\
\
    \{\
        id: 3,\
        name: "Database Systems",\
        credits: 4\
    \}\
\
];\
\
\
// Simulated delayed API\
\
function fetchAllCourses() \{\
\
    return new Promise((resolve) => \{\
\
        setTimeout(() => \{\
\
            resolve(localCourses);\
\
        \}, 1000);\
\
    \});\
\}\
\
\
// Render courses\
\
async function loadCourses() \{\
\
    const container =\
        document.querySelector(\
            "#course-container"\
        );\
\
    container.innerHTML =\
        "<p>Loading courses...</p>";\
\
    const courses =\
        await fetchAllCourses();\
\
    container.innerHTML = "";\
\
    courses.forEach((course) => \{\
\
        const card =\
            document.createElement("div");\
\
        card.className = "card";\
\
        card.innerHTML = `\
            <h3>$\{course.name\}</h3>\
            <p>$\{course.credits\} Credits</p>\
        `;\
\
        container.appendChild(card);\
\
    \});\
\
\}\
\
\
// Promise.all\
\
async function fetchMultipleUsers() \{\
\
    try \{\
\
        const responses =\
            await Promise.all([\
\
                fetch(`$\{API_URL\}/users/1`),\
\
                fetch(`$\{API_URL\}/users/2`)\
\
            ]);\
\
        const users =\
            await Promise.all(\
\
                responses.map(\
                    (response) =>\
                        response.json()\
                )\
\
            );\
\
        console.log(\
            "Promise.all Users:",\
            users[0].name,\
            users[1].name\
        );\
\
    \} catch (error) \{\
\
        console.error(error);\
\
    \}\
\
\}\
\
\
/*\
    TASK 2\
    Fetch API with Error Handling\
*/\
\
\
async function apiFetch(url) \{\
\
    const response =\
        await fetch(url);\
\
    if (!response.ok) \{\
\
        throw new Error(\
            `Request failed: $\{response.status\}`\
        );\
\
    \}\
\
    return response.json();\
\
\}\
\
\
const statusContainer =\
    document.querySelector(\
        "#notification-status"\
    );\
\
const notificationList =\
    document.querySelector(\
        "#notification-list"\
    );\
\
\
async function loadNotifications(\
    useBadUrl = false\
) \{\
\
    statusContainer.innerHTML =\
        `<div class="spinner"></div>\
         <p>Loading notifications...</p>`;\
\
    notificationList.innerHTML = "";\
\
    try \{\
\
        const url = useBadUrl\
\
            ? `$\{API_URL\}/nonexistent`\
\
            : `$\{API_URL\}/posts?_limit=5`;\
\
\
        const posts =\
            await apiFetch(url);\
\
\
        statusContainer.innerHTML = "";\
\
\
        posts.forEach((post) => \{\
\
            const card =\
                document.createElement("article");\
\
            card.className =\
                "notification-card";\
\
            card.innerHTML = `\
\
                <h3>$\{post.title\}</h3>\
\
                <p>$\{post.body\}</p>\
\
            `;\
\
            notificationList.appendChild(card);\
\
        \});\
\
\
    \} catch (error) \{\
\
        statusContainer.innerHTML = `\
\
            <p class="error">\
\
                Unable to load notifications.\
\
                $\{error.message\}\
\
            </p>\
\
            <button id="retry-button">\
\
                Retry\
\
            </button>\
\
        `;\
\
\
        document\
            .querySelector("#retry-button")\
            .addEventListener(\
                "click",\
                () => loadNotifications(false)\
            );\
\
    \}\
\
\}\
\
\
/*\
    TASK 3\
    AXIOS\
*/\
\
\
// Request interceptor\
\
axios.interceptors.request.use(\
\
    (config) => \{\
\
        console.log(\
            `API call started: $\{config.url\}`\
        );\
\
        return config;\
\
    \},\
\
    (error) =>\
        Promise.reject(error)\
\
);\
\
\
// Axios reusable function\
\
async function axiosFetch(url) \{\
\
    try \{\
\
        const response =\
            await axios.get(url);\
\
        return response.data;\
\
    \} catch (error) \{\
\
        throw new Error(\
            "Axios request failed"\
        );\
\
    \}\
\
\}\
\
\
// Fetch posts for user 1\
\
async function fetchUserPosts() \{\
\
    try \{\
\
        const response =\
            await axios.get(\
                `$\{API_URL\}/posts`,\
                \{\
                    params: \{\
                        userId: 1\
                    \}\
                \}\
            );\
\
        console.log(\
            "User 1 Posts:",\
            response.data\
        );\
\
    \} catch (error) \{\
\
        console.error(\
            "Unable to fetch user posts"\
        );\
\
    \}\
\
\}\
\
\
/*\
FETCH VS AXIOS\
\
1. Fetch is built into the browser.\
   Axios is an external library.\
\
2. Fetch requires response.json().\
   Axios automatically parses JSON.\
\
3. Fetch does not reject automatically\
   for HTTP 404/500 errors.\
   Axios rejects non-2xx responses.\
*/\
\
\
// Run functions\
\
fetchUser(1);\
\
fetchUserAsync(2);\
\
loadCourses();\
\
fetchMultipleUsers();\
\
loadNotifications();\
\
fetchUserPosts();}