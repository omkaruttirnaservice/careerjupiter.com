import React from 'react';

const IQTestReport = React.forwardRef(({ studentName, studentScore, totalMarks }, ref) => {

    const getGradeAndMessage = (studentScore) => {
        if (studentScore >= 27 && studentScore <= 30) {
            return {
                grade: 'Outstanding',
                message: 'Exceptional performance! You have outstanding cognitive abilities that place you in the top percentile.'
            };
        }
        if (studentScore >= 26 && studentScore <= 27) {
            return {
                grade: 'Excellent',
                message: 'Excellent results! Your strong aptitude skills indicate great potential for challenging academic and professional paths.'
            };
        }
        if (studentScore >= 23 && studentScore <= 25) {
            return {
                grade: 'Very Good',
                message: 'Very good performance! With some focused improvement, you can reach excellent levels of achievement.'
            };
        }
        if (studentScore >= 20 && studentScore <= 22) {
            return {
                grade: 'Good',
                message: 'Good results! You have solid foundational skills that can be further developed with practice and dedication.'
            };
        }
        if (studentScore >= 14 && studentScore <= 19) {
            return {
                grade: 'Average',
                message: 'Average performance. Consider targeted practice and study to enhance your skills and improve your results.'
            };
        }
        return {
            grade: 'Below Average',
            message: 'Your current results indicate areas for improvement. With consistent effort and proper guidance, you can significantly enhance your performance.'
        };
    };

    const { grade, message } = getGradeAndMessage(studentScore);
    return (
        <div ref={ref} style={{ width: '210mm', minHeight: '297mm', padding: '20mm', background: 'white', fontFamily: 'Arial, sans-serif', lineHeight: 1.6, padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>IQ Test Report</h1>
            </div>

            {/* Student Report Header */}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '15px',
                flexWrap: 'wrap'
            }}>
                <div>
                    <h3 style={{ margin: '5px 0', fontWeight: "bold" }}>Student Name: <span style={{ fontWeight: 'normal' }}>{studentName}</span></h3>
                    <h3 style={{ margin: '5px 0', fontWeight: "bold" }}>Test Score: <span style={{ fontWeight: 'normal' }}>{studentScore}/{totalMarks}</span></h3>
                </div>
            </div>

            <div style={{
                backgroundColor: '#e8f4fc',
                padding: '15px',
                borderRadius: '5px',
                borderLeft: '4px solid #2196F3'
            }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#0d47a1' }}>Analysis:</h4>
                <p style={{ margin: 0 }}>{grade}</p>
                <h4 style={{ margin: '0 0 10px 0', color: '#0d47a1' }}>message:</h4>
                <p style={{ margin: 0 }}>{message}</p>
            </div>

            <p style={{ textAlign: 'right', marginTop: '-20px' }}>
                <a href="http://www.careerjupiter.com">www.careerjupiter.com</a>
            </p>

            <h2>1. UNDERSTANDING APTITUDE</h2>

            <h4>What is Aptitude?</h4>

            <p>An aptitude is a component of a competence to do a certain kind of work at a certain level.
                Outstanding aptitude can be considered "talent", or "skill". Aptitude is inborn potential to perform
                certain kinds of activities, whether physical or mental, and whether developed or undeveloped.
                Aptitude is often contrasted with skills and abilities, which are developed through learning. The
                mass term ability refers to components of competence acquired through a combination of both
                aptitude and skills.</p>
            <p>As students enter secondary stage of schooling, they move closer to making many
                important choices, one of which is deciding the subjects and courses of study at senior secondary
                level such as Humanities, Commerce, Science or Vocational. This decision of students is
                influenced by a number of factors such as their interests, attitudes, motivation, personality and
                aptitude. The decision of students is often influenced by their parents, family members, friends
                and teachers. Teachers and parents play a significant role in helping students to take decisions by
                facilitating students to know their aspirations, strengths and limitations. As we all know that when
                students know their strengths, it helps them to become motivated and put more efforts which is
                likely to result in improved performance.</p>

            <p>Aptitude is a special ability or a cluster of abilities. Since aptitude is a special ability
                required to study or do a job, it indicates the probability of performing well in a particular course
                of study or occupation/ vocation and also indicates the extent to which the person would derive
                benefit by training in a particular vocational area. Different occupations need different sets of
                abilities. For example, to pursue career in medical like MBBS, a student must be sharp in
                understanding statement, analysis, quick to recall ,Thorough basic knowledge of biology and
                physics etc to be a successful architect one requires a set of abilities such as keen sense of
                observation, creativity, a sense of visual memory, ability to sketch free hand, etc. A student having
                these set of abilities is at an advantage and is likely to perform well in this occupation.</p>

            <p>Thus, knowing one's aptitude may help a student to make informed career (educational
                and occupational/ vocational) choices. It is important to know that students' interests, personal
                qualities, educational and occupational information/requirements also play a crucial role in career
                planning.</p>

            <p><b>How Information about Aptitude is Useful for Students?</b></p>

            <p>Information about aptitude is useful for students in seeking academic and/or career guidance. It is
                to be used keeping in view the students' needs and their stage of education. The information about
                a student's strengths and limitations would also help parents, teachers and the school
                administrators to extend support to the student while making such decisions.
                Aptitude test results may help students to:</p>

            <ul>
                <li>Understand and make subject choices in relation to the identified special abilities.</li>
                <li>Explore career pathways related specifically to areas in which they have high aptitudes.</li>
                <li>Reaffirm their aptitude and explore if they want to continue with their chosen course of
                    study or seek alternatives.</li>
                <li>Relook at their occupational aspirations/goals in line with their specific aptitude and review
                    their efforts to achieve desired academic and occupational goals.</li>
            </ul>

            <h2>2. UNDERSTANDING AN APTITUDE TEST</h2>
            <p>The academic achievement is mostly depends on grasping ability, response time
                ,understanding the statement etc. In view of these points ,the IQ/Aptitude test at
                www.careerjupiter.com is designed by academic experts in such a way that it will give fairly
                correct conclusion about the overall understanding level of the examinee. It is designed in such
                a way that, randomly clicking the answers (without any thought process) certainly fail the
                examinee. So it is utmost important that examinee should give fair importance to the test to get
                correct result.
            </p>
            <p>There are three types of tests namely for age 7 to 12,Basic aptitude test for age 13 to 19 and
                advance aptitude test for age 13 to 19. For age 7-12,only 1 test may be enough to come to basic
                conclusion about IQ level of an examinee. For age group 13-19, the ultimate report will be
                generated once advance test is attended by examinee. The advance test is designed by experts in
                such a way that it is difficult to find answers on search engines directly. So the advance test is
                crucial to come to conclusion about the IQ level. test covers seven areas: Language Aptitude (LA),
                Abstract Reasoning (AR), Verbal Reasoning (VR), Mechanical Reasoning (MR), Numerical
                Aptitude (NA), Spatial Aptitude (SA), and Perceptual Aptitude (PA). A brief description of each
                of these dimension is given to help you understand what is measured, how it is measured and the
                relationship of a particular ability with some subject areas and occupational fields/occupations:</p>

            <p><b>1. Language Aptitude (LA)</b> is the ability to draw meaning from written words and use them
                effectively. Language aptitude shows how well an individual understands English words
                and their synonyms, spells words correctly, identifies and understands the correct meaning
                of the given proverbs/idioms. LA sub-test is divided into three sections which measure the
                students' ability to know (i) the meaning of words, (ii) the correct spelling and (iii) the
                meaning of proverbs/idioms.
                Language aptitude is important for performance in courses and occupations/vocations
                involving reading and writing such as English, social sciences, economics, mathematics,
                teaching, journalism and media studies, advertising, law, library sciences, stenography,
                business development, etc.</p>

            <p><b>2. Abstract Reasoning (AR)</b> involves abilities such as thinking logically, managing time,
                and solving problems quickly and effectively. It requires to understand patterns, diagrams
                or designs and draw meaning from them. This ability reveals how well a student can
                reason, extract rules, find underlying logic in the pattern of symbols or shapes, identify
                correct answer among a set of possible options, complete sequence and find the odd one
                out. In AR sub-test, which is a non-verbal sub-test, each item consists of a set of
                figures/patterns which are in a certain sequence. The student is asked to find the next
                figure/pattern in the series. It is important for performance in courses and occupations/vocations such as mathematics,
                economics, physics, chemistry, computer science, biotechnology, computer systems
                analysis, computer programming, architecture, medicine, mechanics, forensic science, etc.</p>

            <p><b>3. Verbal Reasoning (VR)</b> is the ability to solve problems by understanding the meaning and
                ideas framed in words. Verbal reasoning measures how well an individual can apply
                reasoning related to words and draw correct meaning from the written information. In VR
                sub-test, the individual is expected to understand the relationship between paired words
                and apply it to other relationships.
                Verbal reasoning is important for performance in courses and occupations like languages,
                history, geography, economics, business studies, science, psychology, education,
                journalism, business, law, public relations, marketing, advertising, linguistics, medical and
                paramedical fields, administrative services, human resources management, auctioneering,
                etc.</p>

            <p><b>4. Mechanical Reasoning (MR)</b> is the ability to apply reasoning in the practical environment
                using basic concepts in mechanics. This ability helps an individual to solve problems
                related to machines and engage in reasoning about the situation rather than simply applying
                the formulae. In MR sub-test, items are related to acceleration, pressure, energy
                transformation, work and power, levers, pulleys, screws, springs, tools, etc.
                Mechanical reasoning ability is important for courses and occupations/vocations such as
                physics, chemistry, engineering, and other technical skill-oriented occupations such as
                carpentry, masonry, plumbing, etc.</p>

            <p><b>5. Numerical Aptitude (NA)</b> is the ability to perform mathematical operations quickly and
                correctly. Numerical aptitude includes numerical relationships and problem solving related
                to numbers. NA sub-test involves primary arithmetic operations (like addition, subtraction,
                multiplication, and division) and other mathematical operations (like ratio, percentage,
                square and square root).
                Numerical aptitude is important for performance in courses and occupations such as
                mathematics, economics, accountancy, computer sciences, statistics, all types of
                engineering, architecture, computer applications, oceanography, geology, meteorology,
                actuarial sciences, etc.</p>

            <p><b>6. Spatial Aptitude (SA)</b> is the ability to imagine an object in space and decide how it will
                look like when rotated in a given direction. In SA sub-test, the student is asked to identify
                how the figure will look like when seen through a mirror or rotated or when folded in a
                particular way.
                Spatial aptitude is important for performance in courses and occupations/voacations that
                require an individual to visualise objects in 3-dimensions, such as visual and performing
                arts, engineering, physics, chemistry, geometry, geography, drafting, architecture, astronomy, visual arts, animation, designing, urban/town planning, photography,
                multimedia, etc.</p>

            <p><b>7. Perceptual Aptitude (PA)</b> invovles comparing visual information like letters, numbers or
                combinations of letters/numbers, quickly and accurately. In PA sub-test, student is asked to
                compare the paired groups of letters or numbers or combination of letters-numbers and
                identify the similarity or difference.
                Perceptual aptitude is important for performance in courses and occupations/voacations such as
                traffic police, detectives, data entry operations, clerical and secretaryship, personal
                assistantship, assembly work, machine job operations.</p>

            <h2>Test Score</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead style={{ width: '50%' }}>
                    <tr><th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Score</th><th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Grade</th></tr>
                </thead>
                <tbody>
                    <tr><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>27-30</td><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Outstanding</td></tr>
                    <tr><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>26-27</td><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Excellent</td></tr>
                    <tr><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>23-25</td><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Very good</td></tr>
                    <tr><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>20-22</td><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Good</td></tr>
                    <tr><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>14-19</td><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Average</td></tr>
                    <tr><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Below 14</td><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Below average</td></tr>
                </tbody>
            </table>

            <h2>Disclaimer</h2>
            <ul>
                <li>This is online test and results may vary depending on various conditions and factors
                    while examinee appears for this examination hence it may not be claiming the
                    accuracy of outcome.</li>
                <li>Students and parents must consult academic experts before taking any decision based
                    on test scores.</li>
                <li>Repetition of test attempts may give misleading outcomes, after attempting the test
                    sincerely, contact us for premium services of personal counselling by
                    www.careerjupiter.com if you wish to avail our services.</li>
            </ul>

            <h2>Occupations/Vocations and Related Aptitudes</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ flex: '0 0 25%', boxSizing: 'border-box', padding: '10px' }}>
                    <h3>1. Accountant</h3>
                    <ul>
                        <li>Numerical Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Perceptual Aptitude</li>
                    </ul>

                    <h3>2. Agricultural Scientist</h3>
                    <ul>
                        <li>Abstract Reasoning</li>
                        <li>Numerical Aptitude</li>
                        <li>Mechanical Aptitude</li>
                        <li>Language Aptitude</li>
                    </ul>

                    <h3>3. Air Hostess</h3>
                    <ul>
                        <li>Language Aptitude</li>
                        <li>Verbal Reasoning</li>
                        <li>Abstract Reasoning</li>
                    </ul>

                    <h3>4. Air Traffic Control Officer</h3>
                    <ul>
                        <li>Numerical Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Spatial Aptitude</li>
                        <li>Language Aptitude</li>
                    </ul>

                    <h3>5. Animator</h3>
                    <ul>
                        <li>Spatial Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Verbal Reasoning</li>
                    </ul>

                    <h3>6. Architect</h3>
                    <ul>
                        <li>Numerical Aptitude</li>
                        <li>Mechanical Reasoning</li>
                        <li>Spatial Aptitude</li>
                        <li>Abstract Reasoning</li>
                    </ul>

                    <h3>7. Banker</h3>
                    <ul>
                        <li>Numerical Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Perceptual Aptitude</li>
                        <li>Language Aptitude</li>
                    </ul>

                    <h3>8. Beautician</h3>
                    <ul>
                        <li>Language Aptitude</li>
                        <li>Verbal Reasoning</li>
                        <li>Spatial Aptitude</li>
                    </ul>
                </div>

                <div style={{ flex: '0 0 25%', boxSizing: 'border-box', padding: '10px' }}>
                    <h3>9. BPO Associate</h3>
                    <ul>
                        <li>Language Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Verbal Reasoning</li>
                    </ul>

                    <h3>10. Chartered Accountant</h3>
                    <ul>
                        <li>Numerical Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Abstract Reasoning</li>
                    </ul>

                    <h3>11. Civil Servant</h3>
                    <ul>
                        <li>Abstract Reasoning</li>
                        <li>Verbal Reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Perceptual Aptitude</li>
                    </ul>

                    <h3>12. Company Secretary</h3>
                    <ul>
                        <li>Abstract Reasoning</li>
                        <li>Verbal Reasoning</li>
                        <li>Numerical Aptitude</li>
                        <li>Perceptual Aptitude</li>
                    </ul>

                    <h3>13. Computer Programmer</h3>
                    <ul>
                        <li>Numerical Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Verbal Reasoning</li>
                    </ul>

                    <h3>14. Corporate Lawyer</h3>
                    <ul>
                        <li>Verbal Reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Numerical Aptitude</li>
                        <li>Perceptual Aptitude</li>
                    </ul>

                    <h3>15. Counsellor</h3>
                    <ul>
                        <li>Verbal Reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Abstract Reasoning</li>
                    </ul>

                    <h3>16. Dietician</h3>
                    <ul>
                        <li>Abstract Reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Spatial Aptitude</li>
                        <li>Numerical Aptitude</li>
                    </ul>
                </div>

                <div style={{ flex: '0 0 25%', boxSizing: 'border-box', padding: '10px' }}>
                    <h3>17. Event Planners</h3>
                    <ul>
                        <li>Language Aptitude</li>
                        <li>Spatial Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Numerical Aptitude</li>
                    </ul>

                    <h3>18. Fashion Designer</h3>
                    <ul>
                        <li>Spatial Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Numerical Aptitude</li>
                        <li>Language Aptitude</li>
                    </ul>

                    <h3>19. Forensic Scientist</h3>
                    <ul>
                        <li>Abstract Reasoning</li>
                        <li>Numerical Aptitude</li>
                        <li>Perceptual Aptitude</li>
                    </ul>

                    <h3>20. Graphic Designer</h3>
                    <ul>
                        <li>Spatial Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Numerical Aptitude</li>
                        <li>Abstract Reasoning</li>
                    </ul>

                    <h3>21. Hotel Manager</h3>
                    <ul>
                        <li>Verbal Reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Numerical Aptitude</li>
                        <li>Abstract Reasoning</li>
                    </ul>

                    <h3>22. Jewellery Designer</h3>
                    <ul>
                        <li>Spatial Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Language Aptitude</li>
                        <li>Numerical Aptitude</li>
                    </ul>

                    <h3>23. Journalist</h3>
                    <ul>
                        <li>Language Aptitude</li>
                        <li>Verbal Reasoning</li>
                        <li>Abstract Reasoning</li>
                        <li>Numerical Aptitude</li>
                    </ul>

                    <h3>24. Laboratory Assistant</h3>
                    <ul>
                        <li>Mechanical Reasoning</li>
                        <li>Numerical Aptitude</li>
                        <li>Abstract Reasoning</li>
                    </ul>
                </div>

                <div style={{ flex: '0 0 25%', boxSizing: 'border-box', padding: '10px' }}>
                    <h3>25. Mobile App Developer</h3>
                    <ul>
                        <li>Numerical Aptitude</li>
                        <li>Mechanical Reasoning</li>
                        <li>Abstract Reasoning</li>
                        <li>Spatial Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Language Aptitude</li>
                    </ul>

                    <h3>26. Naval Officer</h3>
                    <ul>
                        <li>Numerical Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Spatial Aptitude</li>
                        <li>Verbal Reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Perceptual Aptitude</li>
                    </ul>

                    <h3>27. Nurse</h3>
                    <ul>
                        <li>Abstract Reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Numerical Aptitude</li>
                    </ul>

                    <h3>28. Optician</h3>
                    <ul>
                        <li>Numerical Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Spatial Aptitude</li>
                    </ul>

                    <h3>29. Photographer</h3>
                    <ul>
                        <li>Spatial Aptitude</li>
                        <li>Perceptual Aptitude</li>
                        <li>Abstract Reasoning</li>
                    </ul>

                    <h3>30. Physiotherapist</h3>
                    <ul>
                        <li>Numerical Reasoning</li>
                        <li>Language Aptitude</li>
                        <li>Abstract Reasoning</li>
                        <li>Verbal Reasoning</li>
                    </ul>

                    <h3>31. Pilot</h3>
                    <ul>
                        <li>Abstract Reasoning</li>
                        <li>Perceptual Aptitude</li>
                        <li>Spatial Aptitude</li>
                        <li>Numerical Aptitude</li>
                        <li>Mechanical Reasoning</li>
                        <li>Language Aptitude</li>
                    </ul>

                    <h3>32. Police Officer</h3>
                    <ul>
                        <li>Abstract Reasoning</li>
                        <li>Perceptual Aptitude</li>
                        <li>Language Aptitude</li>
                        <li>Verbal Reasoning</li>
                    </ul>
                </div>
            </div>

            <div>
                <h2>What is beneficial and Successful career for you depending on your score.</h2>

                <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Score</th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Grade</th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Suitable for following career opportunities*</th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Suggestions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>27-30</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Outstanding</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Competitive exams, UPSC, Medical, IITs, NDA, IPS, IFS etc.</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }} rowSpan="3">
                                    Pursue basic courses from early age so that you can achieve your dreams.<br />
                                    Go for personal counseling at
                                    <a href="https://www.careerjupiter.com" target="_blank" rel="noopener noreferrer">careerjupiter.com</a>
                                    so that you can achieve higher than your results. We have customized plan for individual counseling.
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>26-27</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Excellent</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>State level PSC, grade 2 exams, Govt exams, PSU exams, NITs, Pvt medical colleges, Govt Engineering college, CA, ICWA, MSc from heritage institutes.</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>23-25</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Very Good</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Reputed Pvt engineering colleges, Dental, BAMS, Government/reputed Pvt polytechnics.</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>20-22</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Good</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Polytechnic Diploma, Skill courses, ITI</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>-</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>14-19</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Average</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Hardwork and focus will give you success.</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>-</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Below 14</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Below Average</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>It shows your lack of attention in the test or you didn't understand the statements/questions. Work hard.</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p style={{ fontStyle: 'italic' }}>*Subject to government reservation policies and norms for admissions.</p>
            </div>

            <h2>Documents List</h2>
            <table style={{ border: '1px solid black', borderCollapse: 'collapse', padding: '8px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Name of Document</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Diploma (After 10th)</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Engineering (After 12th)</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Direct 2nd Year Engineering</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Scholarship (MahaDBT)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>SSC (10th) Marksheet</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>HSC (12th) Marksheet</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ / ❌</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Diploma Marksheet (All Semesters)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Leaving Certificate</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Domicile Certificate (Maharashtra)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Nationality Certificate / Birth Certificate</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Aadhaar Card</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Bank Passbook (Nationalized Bank)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>MHT-CET / JEE Scorecard</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>CAP Allotment Letter</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Seat Acceptance Receipt</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Caste Certificate (if applicable)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Caste Validity Certificate</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (if needed)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (if needed)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (if needed)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Non-Creamy Layer (OBC/NT/SBC)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (if applicable)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (if applicable)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (if applicable)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Income Certificate</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (for fees/scholarship)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (for scholarship)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (for scholarship)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Migration Certificate</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (if from other board)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (if from other board)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Gap Certificate</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌ / ✅ (if gap)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌ / ✅ (if gap)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌ / ✅ (if gap)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (if applicable)</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Equivalence Certificate (if needed)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (non-MSBTE/autonomous)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>❌</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Disability Certificate (if applicable)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (if applicable)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (if applicable)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (if applicable)</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>✅ (if applicable)</td>
                    </tr>
                </tbody>
            </table>

            <p><b>Click Here & Join:</b> <a href="https://whatsapp.com/channel/0029VbADrN54IBh95nFJiR3e">WhatsApp Group</a></p>
        </div>
    );
});

export default IQTestReport;