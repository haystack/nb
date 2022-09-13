<template>
    <div class="form">
        <h3 class="title">Create a New Account</h3>

        <div class="group">
            <label for="new-user-username"> Username: </label>
            <input id="new-user-username" type="text" v-model="newUser.username">
        </div>

        <div class="group">
            <label for="new-user-first"> First name: </label>
            <input id="new-user-first" type="text" v-model="newUser.first">
        </div>

        <div class="group">
            <label for="new-user-last"> Last name: </label>
            <input id="new-user-last" type="text" v-model="newUser.last">
        </div>

        <div class="group">
            <label for="new-user-email"> Email: </label>
            <input id="new-user-email" type="text" v-model="newUser.email">
        </div>

        <div class="group">
            <label for="new-user-password"> Password: </label>
            <input id="new-user-password" type="password" v-model="newUser.password">
        </div>

        <div class="nb-">
            <div class="nb-irb">
                <p><strong>Letter of Information</strong></p>
                <p><strong>Title of research study:&nbsp;</strong>Leveraging in-context online discussion of course materials to enhance engagement and learning</p>
                <p><strong>Investigator:&nbsp;</strong>David Karger (PI).</p>
                <p>We invite you to take part in a research study, because you are using NB to annotate online material. The goal of this study is to examine whether or not the online reading materials using NB improves engagement and learning. Your feedback will be used to modify the experience on the tool to increase learner engagement and to provide valuable feedback to the instructors that can help them revise their course and content.</p>
                <p><strong>Why is this research being done?</strong></p>
                <p>Student learning outcomes are known to be associated with student engagement. In a small classroom, instructors can gauge student engagement from their classroom behavior and participation and use it to adapt instruction. However, in large classes, instructors find it difficult to determine how and if students are engaging in the class content. This is &nbsp;particularly true with online materials where it is challenging for instructors to observe the students&apos; learning and to make assessments about how to intervene productively on the students&rsquo; behalf.</p>
                <p>The general hypothesis of this research is that student annotation and discussion in the margins of online reading material can be used both to directly increase student engagement and to provide valuable feedback to the faculty that can help them revise their course and content to increase engagement. In particular, we will build upon Nota Bene (NB), a system that allows students to discuss online course content (PDFs, websites, YouTube videos) <em>in the margins&nbsp;</em>of those content sources, in order to:</p>
                <ol start="1" type="1">
                    <li>Gather information about student engagement by mining the discussion content in the margins;</li>
                    <li>Present to instructors information about student engagement that varies over different parts of the content;</li>
                    <li>Help instructors and students leverage information about student engagement in order to increase that engagement and inform class design, and</li>
                    <li>Validate experimentally that increasing student engagement will lead to better learning outcomes.</li>
                    <li>Scale up the social annotation experience to accommodate classes with a large number of students.&nbsp;</li>
                </ol>
                <p><strong><em>Participation in research is completely voluntary</em></strong>.</p>
                <p>You are free to decline to take part in the project. You can decline to answer any questions and you can stop taking part in the project at any time. Whether or not you choose to participate, or answer any question, or stop participating in the project, there will be no penalty to you or loss of benefits to which you are otherwise entitled.</p>
                <p><strong>Confidentiality</strong></p>
                <p>In order to understand the impact of the different teaching practices, we are collecting information on how students are engaging with online materials, this includes clicks, replies and time spent on sessions. All data collected will be securely stored. Only researchers working with the study, all of whom are bound to maintain confidentiality, will view the data. This research is conducted under strict university and U.S. government regulations governing confidentiality procedures. Your identity will be kept strictly confidential throughout the study and in any oral or written results of the study. Your privacy will be protected to the maximum extent allowable by law; however, absolute confidentiality cannot be guaranteed, since research documents are not protected from subpoena.</p>
                <p><strong>Questions</strong></p>
                <p>Thank you for considering participating in this study. If you have any questions or concerns about this research, please feel free to contact Professor David Karger.</p>
                <p>David Karger<br>MIT, CSAIL<br><a href="mailto:karger@mit.edu">karger@mit.edu</a></p>
                <p>&nbsp;</p>
                <details>
                    <summary><strong><u>For users from countries under GDPR (Click here to expand)</u></strong></summary>
                     <p>As part of your participation, we will collect certain personal information about you, including: name and email address. In addition we will be collecting user click data on different features of the tool. The clicks are anonymized. The purpose of the data collection is to examine whether or not the online reading materials using NB improves engagement and learning. Your data will be used to modify the experience on the tool to increase learner engagement and to provide valuable feedback to the instructors that can help them revise their course and content. The information you provide will only be available to MIT and their collaborators. Your data will be secured in our database which is maintained by one of our researchers in the team at MIT.</p>
                    <p>&nbsp;</p>
                    <p>This information will be retained for indefinite time . You have the right to withdraw your data from the study at any time. To do so, contact karger@mit.edu. If you withdraw from the study, no new information will be collected about you or from you by the study team.</p>
                    <p>&nbsp;</p>
                    <p>Your personal information will be transferred to the United States. You understand that the data protection and privacy laws of the United States may not offer you the same level of protection as those in the countries of data&rsquo;s origin/EEA/UK.&nbsp;</p>
                </details>               
            </div>
            <label><span style="color: red;">*</span>Do you consent to participate in our research?</label>
             <br>
            <input type="radio" id="nbIRBYes" value="true" v-model="nbIRB">
            <label for="nbIRBYes">Yes</label>
            <br>
            <input type="radio" id="nbIRBNo" value="false" v-model="nbIRB">
            <label for="nbIRBNo">No</label>
        </div>

        <div v-if="needUCDIRB" class="ucdavis-consent">
            <div class="ucdavis-irb">
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>University of California at Davis Letter of Information</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Title of research study:&nbsp;</span><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Leveraging in-context online discussion of course materials to enhance student engagement and learning</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Investigators:&nbsp;</span><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Marc Facciotti, PhD, (PI); Michele M. Igo, PhD, (Co-PI), Kamali Sripathi, PhD (Co-PI)</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>&nbsp;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Introduction and Purpose</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>We invite you to take part in a research study, because you are a student enrolled in BIS2A at the University of California, Davis. The goal of this study is to examine whether or not the online reading materials associated with BIS2A improves student engagement and learning. Your feedback will be used to modify existing materials to increase student engagement and to provide valuable feedback to the faculty that can help them revise their course and content to increase engagement for future BIS2A classes.</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>&nbsp;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Why is this research being done?</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Student learning outcomes are known to be associated with student engagement. In a small classroom, instructors can gauge student engagement from their classroom behavior and participation and use it to adapt instruction. However, in large classes like BIS2A, instructors find it difficult to determine how and if students are engaging in the class content. This is &nbsp;particularly true with online materials where it is challenging for instructors to observe the students learning and to make assessments about how to intervene productively on the students&rsquo; behalf.</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>&nbsp;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>The general hypothesis of this research is that student annotation and discussion in the margins of online reading material can be used both to directly increase student engagement and to provide valuable feedback to the faculty that can help them revise their course and content to increase engagement. In particular, we will build upon Nota Bene (NB), a system that allows students to discuss online course content (PDFs, websites, YouTube videos)&nbsp;</span><span style='font-family: "Times Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: italic; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>in the margins&nbsp;</span><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>of those content sources, in order to:</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>&nbsp;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style="font-family: Arial; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">● &nbsp;</span><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Gather information about student engagement by mining the discussion content in the margins;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style="font-family: Arial; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">● &nbsp;</span><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Present to instructors information about student engagement that varies over different parts of the content;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style="font-family: Arial; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">● &nbsp;</span><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Help instructors and students leverage information about student engagement in order to increase that engagement and inform class design, and</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style="font-family: Arial; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">● &nbsp;</span><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Validate experimentally that increasing student engagement will lead to better learning outcomes.</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>&nbsp;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 700; font-style: italic; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Participation in research is completely voluntary</span><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>.</span><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'><br></span><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>You are free to decline to take part in the project. You can decline to answer any questions and you can stop taking part in the project at any time. Whether or not you choose to participate, or answer any question, or stop participating in the project, there will be no penalty to you or loss of benefits to which you are otherwise entitled.</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>&nbsp;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>There are approximately 26 reading assignments during the quarter (1 reading/lecture). The researchers will then access student comments to determine the level of engagement, understandability, and impact on academic success. Students may be randomly assigned to groups and the group assignment (control versus intervention) may change during the quarter.</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>&nbsp;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>After the quarter is over, the researchers will examine your comments on Nota Bene and your performance on specific classroom assessments. They will also use demographic data from university databases to investigate whether or not the reading assignments are inclusive and equally accessible to all students (For more information, see the Confidentiality section below).The goal is to determine if specific changes in the online reading assignments impact the level of confusion and engagement as described by the students and the academic performance based on course assessments. This information will be provided to the instructor and used by the BIS2A team responsible for the creation of all online course materials to improve the class.</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>&nbsp;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 700; font-style: italic; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>How long will the research last?</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>We expect that you will be an active participant in this research study during the quarter in which you are enrolled in BIS2A. Analysis of the data generated from your participation will begin the day you enroll in the study and will continue until the end of the study.</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>&nbsp;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Confidentiality</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>In order to understand the impact of the different teaching practices, we are collecting information on how students are engaging with online materials and how this relates to the mastery of BIS2A learning objective as assessed through examination. Other information that will help us understand the impact of online learning materials on course outcomes will be collected from university databases, such as your first language, family background, ethnicity and stated gender. The instructors will not be collecting or have access to this information until after the conclusion of the term and the submission of grades.&nbsp;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>&nbsp;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Instead, the researchers will obtain this information at the end of the quarter in a de-identified form from the university. Your name will be immediately removed from any information collected and replaced with an identifier code by an Educational Analyst at the Center of Educational Effectiveness, UC Davis. All data collected will be securely stored. Only researchers working with the study, all of whom are bound to maintain confidentiality, will view the data. This research is conducted under strict university and U.S. government regulations governing confidentiality procedures. Your identity will be kept strictly confidential throughout the study and in any oral or written results of the study. Your privacy will be protected to the maximum extent allowable by law; however, absolute confidentiality cannot be guaranteed, since research documents are not protected from subpoena.</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>&nbsp;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Questions</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Thank you for considering participating in this study. If you have any questions or concerns about this research, please feel free to contact either Dr. Sripathi, Dr. Facciotti, or Dr. Igo by phone or email.</span></span></p>
                <p><span style="font-size: 12px;"><br></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Dr. Kamali Sripathi, Ph.D</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>UC Davis Genome Center<br>University of California, Davis</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times New Roman"; color: rgb(0, 0, 255); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>ksripathi@ucdavis.edu</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>&nbsp;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Dr. Marc Facciotti, Ph.D.</span><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'><br></span><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Dept. of Biomedical Engineering</span><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'><br></span><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>University of California, Davis</span><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'><br></span><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Office :: 530-752-3781&nbsp;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times New Roman"; color: rgb(0, 0, 255); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>mtfacciotti@ucdavis.edu</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>&nbsp;</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Dr. Michele Igo, Ph.D. Professor</span><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'><br></span><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Dept. of Microbiology and Molecular Genetics</span><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'><br></span><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>University of California, Davis</span><span style='font-family: "Helvetica Neue", sans-serif; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'><br></span><span style='font-family: "Times New Roman"; color: rgb(50, 53, 57); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Office :: 530-752-4463</span></span></p>
                <p dir="ltr" style="line-height:1.2;text-align: justify;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;"><span style='font-family: "Times New Roman"; color: rgb(0, 0, 255); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>mmigo@ucdavis.edu&nbsp;</span></span></p>
            </div>
            <label><span style="color: red;">*</span>Do you consent to participate in our research?</label>
             <br>
            <input type="radio" id="ucdavisIRBYes" value="true" v-model="ucdavisIRB">
            <label for="ucdavisIRBYes">Yes</label>
            <br>
            <input type="radio" id="ucdavisIRBNo" value="false" v-model="ucdavisIRB">
            <label for="ucdavisIRBNo">No</label>
        </div>

        <button class="submit" :disabled="!submitEnabled" @click="createUser">Sign up</button>
        <span class="register-message"><br>{{registerMessage}}<br></span>
    </div>
</template>

<script>
    import axios from "axios"
    import { eventBus } from "../../main"

    export default {
        name: "user-create",
        data() {
            return {
                newUser: {
                    username: "",
                    first: "",
                    last: "",
                    email: "",
                    password: "",
                },
                registerMessage: "",
                ucdavisIRB: null,
                nbIRB: null,
            }
        },
        computed: {
            submitEnabled: function() {
                return this.newUser.username.length > 0
                        && this.newUser.first.length > 0
                        && this.newUser.last.length > 0
                        && this.newUser.email.length > 0
                        && this.newUser.password.length > 0
                        && this.nbIRB!== null
                        && ((this.needUCDIRB && this.ucdavisIRB!== null) || (!this.needUCDIRB))
            },
            needUCDIRB: function() {
                return this.newUser.email.includes('@ucdavis.edu')
            },
        },
        methods: {
            createUser: async function() {
                try {
                    await axios.post("api/users/register", this.newUser)
                    const res = await axios.post("/api/users/login", this.newUser)
                    const token = res.data.token
                    localStorage.setItem("nb.user", token);

                    const h1 = { headers: { Authorization: 'Bearer ' + token }}
                    const consentRes = await axios.post(`/api/consent`, {name: 'NB', consent: this.nbIRB}, h1)
                    const t1 = consentRes.data.token
                    localStorage.setItem("nb.user", t1);

                    if (this.needUCDIRB) {
                        const h2 = { headers: { Authorization: 'Bearer ' + t1 }}
                        const consentRes = await axios.post(`/api/consent`, {name: 'UCDAVIS', consent: this.ucdavisIRB}, h2)
                        const t2 = consentRes.data.token
                        localStorage.setItem("nb.user", t2);
                    }
                    eventBus.$emit('signin-success')
                    this.resetForm()
                } catch (error) {
                    console.log(error)
                    let msg = error.response.data.msg
                    console.error(`Signup failed: ${msg}`)
                    if (msg.includes("unique")) {
                        if (msg.includes("username")) {
                            this.setRegisterMessage("There is already any account configured for this username. Please use a different one, or you can use the Reset Password option to access the account.")
                        } else if (msg.includes("email")) {
                            this.setRegisterMessage("There is already any account configured for this email. Please use a different one, or you can use the Reset Password option to access the account.")
                        }
                    } else if (msg.includes("isEmail")) {
                        this.setRegisterMessage("Please enter a valid email with the correct format, such as test@mail.com")
                    } 
                }
            },
            resetForm: function() {
                this.newUser = {
                    username: "",
                    first: "",
                    last: "",
                    email: "",
                    password: "",
                }
            },
            setRegisterMessage: function(msg, disappear=true) {
                this.registerMessage = msg;
                if (disappear) {
                    setTimeout(() => this.registerMessage = "", 10000);
                }
            },
        },
    }
</script>

<style scoped>
.form {
    width: 380px;
    display: flex;
    flex-direction: column;
    padding: 20px;
}
.form .title {
    margin: 0;
    padding: 10px 0 20px 0;
}
.form .group {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
}
.form .group label {
    margin-right: 5px;
}
.form .group input {
    padding: 4px 6px;
    border-radius: 3px;
    border: solid 1px #aaa;
    font-size: 16px;
    flex-grow: 1;
}
  button.submit {
    align-self: flex-end;
    padding: 10px 15px;
    border-radius: 5px;
    border: solid 1px #38155a;
    background-color: #4a2270;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
button.submit:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
  button.submit:enabled:hover {
    background-color: #38155a;
  }
.nb-consent {
    margin: 10px 0 20px 0;
}
.nb-irb {
    border: 1px solid #4a2270;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    min-height: 300px;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    font-size: 12px;
}
.ucdavis-consent {
    margin: 10px 0 20px 0;
}
.ucdavis-irb {
    border: 1px solid #4a2270;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    min-height: 300px;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
