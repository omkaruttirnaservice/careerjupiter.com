import React from "react"
import "./iq-test-report.css"

const IQTestReport = React.forwardRef(({ studentName, studentScore, totalMarks }, ref) => {
    const getGradeAndMessage = (studentScore) => {
        if (studentScore >= 27 && studentScore <= 30) {
            return {
                grade: "Outstanding",
                message:
                    "Exceptional performance! You have outstanding cognitive abilities that place you in the top percentile.",
            }
        }
        if (studentScore >= 26 && studentScore <= 27) {
            return {
                grade: "Excellent",
                message:
                    "Excellent results! Your strong aptitude skills indicate great potential for challenging academic and professional paths.",
            }
        }
        if (studentScore >= 23 && studentScore <= 25) {
            return {
                grade: "Very Good",
                message: "Very good performance! With some focused improvement, you can reach excellent levels of achievement.",
            }
        }
        if (studentScore >= 20 && studentScore <= 22) {
            return {
                grade: "Good",
                message:
                    "Good results! You have solid foundational skills that can be further developed with practice and dedication.",
            }
        }
        if (studentScore >= 14 && studentScore <= 19) {
            return {
                grade: "Average",
                message:
                    "Average performance. Consider targeted practice and study to enhance your skills and improve your results.",
            }
        }
        return {
            grade: "Below Average",
            message:
                "Your current results indicate areas for improvement. With consistent effort and proper guidance, you can significantly enhance your performance.",
        }
    }

    const { grade, message } = getGradeAndMessage(studentScore)
    return (
        <div ref={ref} className="report-container">
            <header>
                <h1 className="report-heading">IQ Test Report</h1>
            </header>
            <div className="content">
                <div>
                    <h3 style={{ margin: "5px 0", fontWeight: "bold" }}>
                        Student Name: <span style={{ fontWeight: "normal" }}>{studentName}</span>
                    </h3>
                    <h3 style={{ margin: "5px 0", fontWeight: "bold" }}>
                        Test Score:{" "}
                        <span style={{ fontWeight: "normal" }}>
                            {studentScore}/{totalMarks}
                        </span>
                    </h3>
                    <h3 style={{ margin: "5px 0", fontWeight: "bold" }}>
                    Performance:{" "}
                        <span style={{ fontWeight: "normal" }}>
                        {grade}
                        </span>
                    </h3>
                </div>

                <h2 className="section-title">1. UNDERSTANDING APTITUDE</h2>
                <h3 className="sub-title">What is Aptitude?</h3>
                <p className="paragraph">
                    An aptitude is a component of a competence to do a certain kind of work at a certain level. Outstanding
                    aptitude can be considered "talent", or "skill". Aptitude is inborn potential to perform certain kinds of
                    activities, whether physical or mental, and whether developed or undeveloped. Aptitude is often contrasted
                    with skills and abilities, which are developed through learning. The mass term ability refers to components of
                    competence acquired through a combination of both aptitude and skills.
                </p>
                <p className="paragraph">
                    As students enter secondary stage of schooling, they move closer to making many important choices, one of
                    which is deciding the subjects and courses of study at senior secondary level such as Humanities, Commerce,
                    Science or Vocational. This decision of students is influenced by a number of factors such as their interests,
                    attitudes, motivation, personality and aptitude. The decision of students is often influenced by their
                    parents, family members, friends and teachers. Teachers and parents play a significant role in helping
                    students to take decisions by facilitating students to know their aspirations, strengths and limitations. As
                    we all know that when students know their strengths, it helps them to become motivated and put more efforts
                    which is likely to result in improved performance.
                </p>
                <p className="paragraph">
                    Aptitude is a special ability or a cluster of abilities. Since aptitude is a special ability required to study
                    or do a job, it indicates the probability of performing well in a particular course of study or occupation/
                    vocation and also indicates the extent to which the person would derive benefit by training in a particular
                    vocational area. Different occupations need different sets of abilities. For example, to pursue career in
                    medical like MBBS, a student must be sharp in understanding statement, analysis, quick to recall ,Thorough
                    basic knowledge of biology and physics etc to be a successful architect one requires a set of abilities such
                    as keen sense of observation, creativity, a sense of visual memory, ability to sketch free hand, etc. A
                    student having these set of abilities is at an advantage and is likely to perform well in this occupation.
                </p>
                <p className="paragraph">
                    Thus, knowing one's aptitude may help a student to make informed career (educational and occupational/
                    vocational) choices. It is important to know that students' interests, personal qualities, educational and
                    occupational information/requirements also play a crucial role in career planning.
                </p>
                <h3 className="sub-title">How Information about Aptitude is Useful for Students?</h3>
                <p className="paragraph">
                    Information about aptitude is useful for students in seeking academic and/or career guidance. It is to be used
                    keeping in view the students' needs and their stage of education. The information about a student's strengths
                    and limitations would also help parents, teachers and the school administrators to extend support to the
                    student while making such decisions.
                </p>
                <p className="paragraph">Aptitude test results may help students to:</p>
                <ul className="list">
                    <li className="list-item">
                        Understand and make subject choices in relation to the identified special abilities.
                    </li>
                    <li className="list-item">
                        Explore career pathways related specifically to areas in which they have high aptitudes.
                    </li>
                    <li className="list-item">
                        Reaffirm their aptitude and explore if they want to continue with their chosen course of study or seek
                        alternatives.
                    </li>
                    <li className="list-item">
                        Relook at their occupational aspirations/goals in line with their specific aptitude and review their efforts
                        to achieve desired academic and occupational goals.
                    </li>
                </ul>

                <h2 className="section-title force-page-break">2. UNDERSTANDING AN APTITUDE TEST</h2>
                <p className="paragraph">
                    The academic achievement is mostly depends on grasping ability, response time ,understanding the statement
                    etc. In view of these points ,the IQ/Aptitude test at www.careerjupiter.com is designed by academic experts in
                    such a way that it will give fairly correct conclusion about the overall understanding level of the examinee.
                    It is designed in such a way that, randomly clicking the answers (without any thought process) certainly fail
                    the examinee. So it is utmost important that examinee should give fair importance to the test to get correct
                    result.
                </p>
                <p className="paragraph">
                    There are three types of tests namely for age 7 to 12,Basic aptitude test for age 13 to 19 and advance
                    aptitude test for age 13 to 19. For age 7-12,only 1 test may be enough to come to basic conclusion about IQ
                    level of an examinee. For age group 13-19, the ultimate report will be generated once advance test is attended
                    by examinee. The advance test is designed by experts in such a way that it is difficult to find answers on
                    search engines directly. So the advance test is crucial to come to conclusion about the IQ level. test covers
                    seven areas: Language Aptitude (LA), Abstract Reasoning (AR), Verbal Reasoning (VR), Mechanical Reasoning
                    (MR), Numerical Aptitude (NA), Spatial Aptitude (SA), and Perceptual Aptitude (PA). A brief description of
                    each of these dimension is given to help you understand what is measured, how it is measured and the
                    relationship of a particular ability with some subject areas and occupational fields/occupations:
                </p>
                <p className="paragraph">
                    <span className="bold">1. Language Aptitude (LA)</span> is the ability to draw meaning from written words and
                    use them effectively. Language aptitude shows how well an individual understands English words and their
                    synonyms, spells words correctly, identifies and understands the correct meaning of the given proverbs/idioms.
                    LA sub-test is divided into three sections which measure the students' ability to know (i) the meaning of
                    words, (ii) the correct spelling and (iii) the meaning of proverbs/idioms.
                </p>
                <p className="paragraph">
                    Language aptitude is important for performance in courses and occupations/vocations involving reading and
                    writing such as English, social sciences, economics, mathematics, teaching, journalism and media studies,
                    advertising, law, library sciences, stenography, business development, etc.
                </p>
                <p className="paragraph">
                    <span className="bold">2. Abstract Reasoning (AR)</span> involves abilities such as thinking logically,
                    managing time, and solving problems quickly and effectively. It requires to understand patterns, diagrams or
                    designs and draw meaning from them. This ability reveals how well a student can reason, extract rules, find
                    underlying logic in the pattern of symbols or shapes, identify correct answer among a set of possible options,
                    complete sequence and find the odd one out. In AR sub-test, which is a non-verbal sub-test, each item consists
                    of a set of figures/patterns which are in a certain sequence. The student is asked to find the next
                    figure/pattern in the series.
                </p>

                <p className="paragraph">
                    It is important for performance in courses and occupations/vocations such as mathematics, economics, physics,
                    chemistry, computer science, biotechnology, computer systems analysis, computer programming, architecture,
                    medicine, mechanics, forensic science, etc.
                </p>
                <p className="paragraph">
                    <span className="bold">3. Verbal Reasoning (VR)</span> is the ability to solve problems by understanding the
                    meaning and ideas framed in words. Verbal reasoning measures how well an individual can apply reasoning
                    related to words and draw correct meaning from the written information. In VR sub-test, the individual is
                    expected to understand the relationship between paired words and apply it to other relationships.
                </p>
                <p className="paragraph">
                    Verbal reasoning is important for performance in courses and occupations like languages, history, geography,
                    economics, business studies, science, psychology, education, journalism, business, law, public relations,
                    marketing, advertising, linguistics, medical and paramedical fields, administrative services, human resources
                    management, auctioneering, etc.
                </p>
                <p className="paragraph">
                    <span className="bold">4. Mechanical Reasoning (MR)</span> is the ability to apply reasoning in the practical
                    environment using basic concepts in mechanics. This ability helps an individual to solve problems related to
                    machines and engage in reasoning about the situation rather than simply applying the formulae. In MR sub-test,
                    items are related to acceleration, pressure, energy transformation, work and power, levers, pulleys, screws,
                    springs, tools, etc.
                </p>
                <p className="paragraph">
                    Mechanical reasoning ability is important for courses and occupations/vocations such as physics, chemistry,
                    engineering, and other technical skill-oriented occupations such as carpentry, masonry, plumbing, etc.
                </p>
                <p className="paragraph">
                    <span className="bold">5. Numerical Aptitude (NA)</span> is the ability to perform mathematical operations
                    quickly and correctly. Numerical aptitude includes numerical relationships and problem solving related to
                    numbers. NA sub-test involves primary arithmetic operations (like addition, subtraction, multiplication, and
                    division) and other mathematical operations (like ratio, percentage, square and square root).
                </p>
                <p className="paragraph">
                    Numerical aptitude is important for performance in courses and occupations such as mathematics, economics,
                    accountancy, computer sciences, statistics, all types of engineering, architecture, computer applications,
                    oceanography, geology, meteorology, actuarial sciences, etc.
                </p>
                <p className="paragraph">
                    <span className="bold">6. Spatial Aptitude (SA)</span> is the ability to imagine an object in space and decide
                    how it will look like when rotated in a given direction. In SA sub-test, the student is asked to identify how
                    the figure will look like when seen through a mirror or rotated or when folded in a particular way.
                </p>
                <p className="paragraph">
                    Spatial aptitude is important for performance in courses and occupations/voacations that require an individual
                    to visualise objects in 3-dimensions, such as visual and performing arts, engineering, physics, chemistry,
                    geometry, geography, drafting, architecture,
                </p>

                <p className="paragraph">
                    astronomy, visual arts, animation, designing, urban/town planning, photography, multimedia, etc.
                </p>
                <p className="paragraph">
                    <span className="bold">7. Perceptual Aptitude (PA)</span> invovles comparing visual information like letters,
                    numbers or combinations of letters/numbers, quickly and accurately. In PA sub-test, student is asked to
                    compare the paired groups of letters or numbers or combination of letters-numbers and identify the similarity
                    or difference.
                </p>
                <p className="paragraph">
                    Perceptual aptitude is important for performance in courses and occupations/voacations such as traffic police,
                    detectives, data entry operations, clerical and secretaryship, personal assistantship, assembly work, machine
                    job operating and coding, banking, proof reading, computer programming, record keeping, etc
                </p>

                <h3 className="sub-title force-page-break">Test score</h3>
                <table className="table">
                    <tbody>
                        <tr>
                            <td className="table-cell table-cell-center">Score</td>
                            <td className="table-cell table-cell-center">Grade</td>
                        </tr>
                        <tr>
                            <td className="table-cell table-cell-center">27-30</td>
                            <td className="table-cell table-cell-center">Outstanding</td>
                        </tr>
                        <tr>
                            <td className="table-cell table-cell-center">26-27</td>
                            <td className="table-cell table-cell-center">Excellent</td>
                        </tr>
                        <tr>
                            <td className="table-cell table-cell-center">23-25</td>
                            <td className="table-cell table-cell-center">Very good</td>
                        </tr>
                        <tr>
                            <td className="table-cell table-cell-center">20-22</td>
                            <td className="table-cell table-cell-center">Good</td>
                        </tr>
                        <tr>
                            <td className="table-cell table-cell-center">14-19</td>
                            <td className="table-cell table-cell-center">Average</td>
                        </tr>
                        <tr>
                            <td className="table-cell table-cell-center">Below 14</td>
                            <td className="table-cell table-cell-center">Below average</td>
                        </tr>
                    </tbody>
                </table>

                <div className="disclaimer">
                    <div className="bold disclaimer-title">Disclaimer-</div>
                    <ol className="numbered-list">
                        <li className="numbered-list-item">
                            This is online test and results may vary depending on various conditions and factors while examinee
                            appears for this examination hence it may not be claiming the accuracy of outcome.
                        </li>
                        <li className="numbered-list-item">
                            Students and parents must consult academic experts before taking any decision based on test scores.
                        </li>
                        <li className="numbered-list-item">
                            Repetition of test attempts may give misleading outcomes, after attempting the test sincerely, contact us
                            for premium services of personal counselling by www.careerjupiter.com if you wish to avail our services.
                        </li>
                    </ol>
                </div>

                <h3 className="sub-title">What is beneficial and Successful career for you depending on your score.</h3>
                <table className="table">
                    <tbody>
                        <tr>
                            <td className="table-cell table-cell-center">Score</td>
                            <td className="table-cell table-cell-center">Grade</td>
                            <td className="table-cell table-cell-center">Suitable for following career opportunities*</td>
                            <td className="table-cell table-cell-center">Suggestions</td>
                        </tr>
                        <tr>
                            <td className="table-cell table-cell-center">27-30</td>
                            <td className="table-cell table-cell-center">Outstanding</td>
                            <td className="table-cell table-cell-left">Competitive exams, UPSC, Medical,IITs,NDA,IPS,IFS etc.</td>
                            <td className="table-cell table-cell-left" rowSpan="3">
                                Pursue basic courses from early age so that you can achieve your dreams. Go for personal counseling of
                                www.careerjupiter.com so that you can achieve higher than your results. We have customized plan for
                                individual counseling.
                            </td>
                        </tr>
                        <tr>
                            <td className="table-cell table-cell-center">26-27</td>
                            <td className="table-cell table-cell-center">Excellent</td>
                            <td className="table-cell table-cell-left">
                                State level PSC,grade 2 exams, Govt exams,PSU exams,NITs, Pvt medical colleges, Govt Engineering
                                college,CA,ICWA,MSc from heritage institues,
                            </td>
                        </tr>
                        <tr>
                            <td className="table-cell table-cell-center">23-25</td>
                            <td className="table-cell table-cell-center">Very good</td>
                            <td className="table-cell table-cell-left">
                                Reputed Pvt engineering colleges,Dental,BAMS, Government/reputed pvt polytechnics,
                            </td>
                        </tr>
                        <tr>
                            <td className="table-cell table-cell-center">20-22</td>
                            <td className="table-cell table-cell-center">Good</td>
                            <td className="table-cell table-cell-left">Polytechnic Diploma, Skill courses,ITI</td>
                            <td className="table-cell table-cell-left"></td>
                        </tr>
                        <tr>
                            <td className="table-cell table-cell-center">14-19</td>
                            <td className="table-cell table-cell-center">Average</td>
                            <td className="table-cell table-cell-left">Hardwork and focus will give you success.</td>
                            <td className="table-cell table-cell-left"></td>
                        </tr>
                        <tr>
                            <td className="table-cell table-cell-center">Below 14</td>
                            <td className="table-cell table-cell-center">Below average</td>
                            <td className="table-cell table-cell-left">
                                It shows your lack of attention in the test or you didn't understand the statements /questions. Work
                                hard
                            </td>
                            <td className="table-cell table-cell-left"></td>
                        </tr>
                    </tbody>
                </table>

                <div className="footnote">*-Subject to government reservation policies and norms for admissions</div>

                <h3 className="sub-title force-page-break">Some Occupations/Vocations and Related Aptitudes</h3>
                <div className="occupation-container">
                    <ul className="occupation-list">
                        <div className="occupation-title">1. Accountant</div>
                        <li>Numerical Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Perceptual Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">2. Agricultural Scientist</div>
                        <li>Abstract Reasoning</li>
                        <li>Numerical Aptitude</li>
                        <li>Mechanical Aptitude</li>
                        <li>Language Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">3. Air Hostess</div>
                        <li>Language Aptitude</li>
                        <li>Verbal Reasoning</li>
                        <li>Abstract Reasoning</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">4. Air Traffic Control Officer</div>
                        <li>Numerical Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Spatial Aptitude</li>
                        <li>Language Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">5. Animator</div>
                        <li>Spatial Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Verbal Reasoning</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">6. Architect</div>
                        <li>Numerical Aptitude</li>
                        <li>Mechanical Reasoning</li>
                        <li>Spatial Aptitude</li>
                        <li>Abstract Reasoning</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">7. Banker</div>
                        <li>Numerical Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Perceptual Aptitude</li>
                        <li>Language Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">8. Beautician</div>
                        <li>Language Aptitude</li>
                        <li>Verbal Reasoning</li>
                        <li>Spatial Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">9. BPO Associate</div>
                        <li>Language Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Verbal Reasoning</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">10. Charted Accountant</div>
                        <li>Numerical Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Abstract Reasoning</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">11. Civil Servant</div>
                        <li>Abstract Reasoning</li>
                        <li>Verbal Reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Perceptual Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">12. Company Secretary</div>
                        <li>Abstract Reasoning</li>
                        <li>Verbal Reasoning</li>
                        <li>Numerical Aptitude</li>
                        <li>Perceptual Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">13. Computer Programmer</div>
                        <li>Numerical Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Verbal Reasoning</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">14. Corporate Lawyer</div>
                        <li>Verbal Reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Numerical Aptitude</li>
                        <li>Perceptual Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">15. Counsellor</div>
                        <li>Verbal Reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Abstract Reasoning</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">16. Dietician</div>
                        <li>Abstract reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Spatial Aptitude</li>
                        <li>Numerical Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">17. Event Planers</div>
                        <li>Language Aptitude</li>
                        <li>Spatial Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Numerical Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">18. Fashion Designer</div>
                        <li>Spatial Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Numerical Aptitude</li>
                        <li>Language Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">19. Forensic Scientist</div>
                        <li>Abstract Reasoning</li>
                        <li>Numerical Aptitude</li>
                        <li>Perceptual Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">20. Graphic Designer</div>
                        <li>Spatial Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Numerical Aptitude</li>
                        <li>Abstract Reasoning</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">21. Hotel Manager</div>
                        <li>Verbal Reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Numerical Aptitude</li>
                        <li>Abstract Reasoning</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">22. Jewellery Designer</div>
                        <li>Spatial Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Language Aptitude</li>
                        <li>Numerical Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">23. Journalist</div>
                        <li>Language Aptitude</li>
                        <li>Verbal Reasoning</li>
                        <li>Abstract Reasoning</li>
                        <li>Numerical Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">24. Laboratory Assistant</div>
                        <li>Mechanical Reasoning</li>
                        <li>Numerical Aptitude</li>
                        <li>Abstract Reasoning</li>
                    </ul>

                    <ul className="occupation-list">
                        <h1 className="occupation-title">25. Mobile App Developer</h1>
                        <li>Numerical Aptitude</li>
                        <li>Mechanical Reasoning</li>
                        <li>Abstract Reasoning</li>
                        <li>Spatial Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Language Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">26. Naval Officer</div>
                        <li>Numerical Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Spatial Aptitude</li>
                        <li>Verbal Reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Perceptual Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">27. Nurse</div>
                        <li>Abstract Reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Numerical Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">28. Optician</div>
                        <li>Numerical Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Spatial Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">29. Photographer</div>
                        <li>Spatial Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Abstract Reasoning</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">30. Physiotherapist</div>
                        <li>Numerical Reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Verbal Reasoning</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">31. Pilot</div>
                        <li>Abstract Reasoning</li>
                        <li>Perceptual Aptitude</li>
                        <li>Spatial Aptitude</li>
                        <li>Numerical Aptitude</li>
                        <li>Mechanical Reasoning</li>
                        <li>Language Aptitude</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">32. Police Officer</div>
                        <li>Abstract Reasoning</li>
                        <li>Perceptual Aptitude</li>
                        <li>Language Aptitude</li>
                        <li>Verbal Reasoning</li>
                    </ul>

                    <ul className="occupation-list">
                        <div className="occupation-title">33. Retail Manager</div>
                        <li>Language Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Numerical Aptitude</li>
                    </ul>
                </div>

                <h3 className="sub-title">List of Documents</h3>
                <table className="document-table">
                    <tbody>
                        <tr>
                            <td className="document-cell document-cell-center" rowSpan="2">
                                Name of Document
                            </td>
                            <td className="document-cell document-cell-center" colSpan="4">
                                Required For
                            </td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-center">Diploma (After 10th)</td>
                            <td className="document-cell document-cell-center">Engineering (After 12th)</td>
                            <td className="document-cell document-cell-center">Direct 2nd Year Engineering</td>
                            <td className="document-cell document-cell-center">Scholarship (MahaDBT)</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">SSC (10th) Marksheet</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">HSC (12th) Marksheet</td>
                            <td className="document-cell document-cell-center">❌</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅ / ❌ (if not done 12th)</td>
                            <td className="document-cell document-cell-center">✅ (if applicable)</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">Diploma Marksheet (All Semesters)</td>
                            <td className="document-cell document-cell-center">❌</td>
                            <td className="document-cell document-cell-center">❌</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">Leaving Certificate</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">Domicile Certificate (Maharashtra)</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">Nationality Certificate / Birth Cert.</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">Aadhaar Card</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">Bank Passbook (Nationalized Bank)</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">MHT-CET / JEE Scorecard</td>
                            <td className="document-cell document-cell-center">❌</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">❌</td>
                            <td className="document-cell document-cell-center">❌</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">CAP Allotment Letter</td>
                            <td className="document-cell document-cell-center">❌</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">Seat Acceptance Receipt</td>
                            <td className="document-cell document-cell-center">❌</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">Caste Certificate (if applicable)</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                            <td className="document-cell document-cell-center">✅</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">Caste Validity Certificate</td>
                            <td className="document-cell document-cell-center">✅ (if needed)</td>
                            <td className="document-cell document-cell-center">✅ (if needed)</td>
                            <td className="document-cell document-cell-center">✅ (if needed)</td>
                            <td className="document-cell document-cell-center">✅</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">Non-Creamy Layer (OBC/NT/SBC)</td>
                            <td className="document-cell document-cell-center">✅ (if applicable)</td>
                            <td className="document-cell document-cell-center">✅ (if applicable)</td>
                            <td className="document-cell document-cell-center">✅ (if applicable)</td>
                            <td className="document-cell document-cell-center">✅</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">Income Certificate</td>
                            <td className="document-cell document-cell-center">✅ (for fees/scholarship)</td>
                            <td className="document-cell document-cell-center">✅ (for scholarship)</td>
                            <td className="document-cell document-cell-center">✅ (for scholarship)</td>
                            <td className="document-cell document-cell-center">✅</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">Migration Certificate</td>
                            <td className="document-cell document-cell-center">❌</td>
                            <td className="document-cell document-cell-center">✅ (if from other board)</td>
                            <td className="document-cell document-cell-center">✅ (if from other board)</td>
                            <td className="document-cell document-cell-center">❌</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">Gap Certificate</td>
                            <td className="document-cell document-cell-center">❌ / ✅ (if gap)</td>
                            <td className="document-cell document-cell-center">❌ / ✅ (if gap)</td>
                            <td className="document-cell document-cell-center">❌ / ✅ (if gap)</td>
                            <td className="document-cell document-cell-center">✅ (if applicable)</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">Equivalence Certificate (if needed)</td>
                            <td className="document-cell document-cell-center">❌</td>
                            <td className="document-cell document-cell-center">❌</td>
                            <td className="document-cell document-cell-center">✅ (non-MSBTE/autonomous)</td>
                            <td className="document-cell document-cell-center">❌</td>
                        </tr>
                        <tr>
                            <td className="document-cell document-cell-left">Disability Certificate (if applicable)</td>
                            <td className="document-cell document-cell-center">✅ (if applicable)</td>
                            <td className="document-cell document-cell-center">✅ (if applicable)</td>
                            <td className="document-cell document-cell-center">✅ (if applicable)</td>
                            <td className="document-cell document-cell-center">✅ (if applicable)</td>
                        </tr>
                    </tbody>
                </table>

                <div className="whatsapp-box">
                    Click Here & Join
                    <br />
                    <a href="https://whatsapp.com/channel/0029VbADrN54IBh95nFJiR3e">WhatsApp Group</a>
                </div>
            </div>

            {/* <p><b>Click Here & Join:</b> <a href="https://whatsapp.com/channel/0029VbADrN54IBh95nFJiR3e">WhatsApp Group</a></p> */}
        </div>
    )
})

export default IQTestReport
