{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ useState \} from "react";\
\
function StudentProfile() \{\
\
    const [profile, setProfile] =\
        useState(\{\
\
            name: "",\
\
            email: "",\
\
            semester: ""\
\
        \});\
\
\
    const handleChange = (event) => \{\
\
        const \{\
            name,\
            value\
        \} = event.target;\
\
\
        setProfile(\{\
\
            ...profile,\
\
            [name]: value\
\
        \});\
\
    \};\
\
\
    return (\
\
        <section className="profile">\
\
            <h2>Student Profile</h2>\
\
            <input\
                type="text"\
                name="name"\
                placeholder="Name"\
                value=\{profile.name\}\
                onChange=\{handleChange\}\
            />\
\
            <input\
                type="email"\
                name="email"\
                placeholder="Email"\
                value=\{profile.email\}\
                onChange=\{handleChange\}\
            />\
\
            <input\
                type="number"\
                name="semester"\
                placeholder="Semester"\
                value=\{profile.semester\}\
                onChange=\{handleChange\}\
            />\
\
            <h3>Profile Preview</h3>\
\
            <p>\
                Name: \{profile.name\}\
            </p>\
\
            <p>\
                Email: \{profile.email\}\
            </p>\
\
            <p>\
                Semester: \{profile.semester\}\
            </p>\
\
        </section>\
\
    );\
\
\}\
\
export default StudentProfile;}