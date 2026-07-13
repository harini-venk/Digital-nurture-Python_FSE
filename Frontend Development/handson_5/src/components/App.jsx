{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{\
    useEffect,\
    useState\
\} from "react";\
\
import Header\
    from "./components/Header";\
\
import Footer\
    from "./components/Footer";\
\
import CourseCard\
    from "./components/CourseCard";\
\
import StudentProfile\
    from "./components/StudentProfile";\
\
import "./App.css";\
\
\
function App() \{\
\
    const [courses, setCourses] =\
        useState([]);\
\
    const [searchTerm, setSearchTerm] =\
        useState("");\
\
    const [\
        enrolledCourses,\
        setEnrolledCourses\
    ] = useState([]);\
\
    const [loading, setLoading] =\
        useState(true);\
\
    const [error, setError] =\
        useState("");\
\
\
    /*\
        Empty dependency array []\
        means this effect runs only once\
        after the component mounts.\
    */\
\
    useEffect(() => \{\
\
        const fetchCourses = async () => \{\
\
            try \{\
\
                setLoading(true);\
\
                const response =\
                    await fetch(\
                        "https://jsonplaceholder.typicode.com/posts?_limit=5"\
                    );\
\
                if (!response.ok) \{\
\
                    throw new Error(\
                        "Failed to load courses"\
                    );\
\
                \}\
\
                const data =\
                    await response.json();\
\
\
                const courseData =\
                    data.map(\
                        (post, index) => (\{\
\
                            id: post.id,\
\
                            name: post.title,\
\
                            code:\
                                `CS10$\{index + 1\}`,\
\
                            credits:\
                                index % 2 === 0\
                                    ? 4\
                                    : 3,\
\
                            grade: "A"\
\
                        \})\
                    );\
\
\
                setCourses(courseData);\
\
            \} catch (err) \{\
\
                setError(err.message);\
\
            \} finally \{\
\
                setLoading(false);\
\
            \}\
\
        \};\
\
\
        fetchCourses();\
\
    \}, []);\
\
\
    /*\
        This effect runs whenever\
        the courses state changes\
        because courses is included\
        in the dependency array.\
    */\
\
    useEffect(() => \{\
\
        console.log(\
            "Courses updated"\
        );\
\
    \}, [courses]);\
\
\
    const handleEnroll = (course) => \{\
\
        const alreadyEnrolled =\
            enrolledCourses.some(\
                (item) =>\
                    item.id === course.id\
            );\
\
\
        if (!alreadyEnrolled) \{\
\
            setEnrolledCourses([\
\
                ...enrolledCourses,\
\
                course\
\
            ]);\
\
        \}\
\
    \};\
\
\
    const filteredCourses =\
        courses.filter(\
            (course) =>\
\
                course.name\
                    .toLowerCase()\
                    .includes(\
                        searchTerm.toLowerCase()\
                    )\
\
        );\
\
\
    return (\
\
        <>\
\
            <Header\
                siteName="Student Portal"\
                enrolledCount=\{\
                    enrolledCourses.length\
                \}\
            />\
\
\
            <main>\
\
                <section className="courses">\
\
                    <h2>\
                        Available Courses\
                    </h2>\
\
\
                    <input\
                        type="text"\
                        placeholder="Search courses..."\
                        value=\{searchTerm\}\
                        onChange=\{\
                            (event) =>\
                                setSearchTerm(\
                                    event.target.value\
                                )\
                        \}\
                    />\
\
\
                    \{loading && (\
\
                        <p>Loading...</p>\
\
                    )\}\
\
\
                    \{error && (\
\
                        <p className="error">\
\
                            \{error\}\
\
                        </p>\
\
                    )\}\
\
\
                    <div className="course-grid">\
\
                        \{filteredCourses.map(\
                            (course) => (\
\
                                <CourseCard\
\
                                    key=\{course.id\}\
\
                                    \{...course\}\
\
                                    onEnroll=\{\
                                        handleEnroll\
                                    \}\
\
                                />\
\
                            )\
                        )\}\
\
                    </div>\
\
                </section>\
\
\
                <StudentProfile />\
\
\
            </main>\
\
\
            <Footer />\
\
        </>\
\
    );\
\
\}\
\
export default App;}