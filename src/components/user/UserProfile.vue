<template>
    <div class="form">
        <h1 class="title">User Profile & Settings</h1>
        <div class="profile-row">
            <h2>Personal Details</h2>
        <div class="group">
            <label for="new-user-username"> Username: </label>
            <input id="new-user-username" type="text" v-model="newUser.username" >
        </div>
        <div class="group">
            <label for="new-user-first"> First name: </label>
            <input id="new-user-first" type="text" v-model="newUser.first" >
        </div>
        <div class="group">
            <label for="new-user-last"> Last name: </label>
            <input id="new-user-last" type="text" v-model="newUser.last">
        </div>
        <div class="group">
            <label for="new-user-email"> Email: </label>
            <input id="new-user-email" type="text" v-model="newUser.email">
        </div>
        <button class="submit" id="personal" :disabled="!submitPersonalEnabled" @click="editPersonal">Update Personal Details</button>
        <span class="profile-message"><br>{{personalMessage}}<br></span>
        <br>
        <hr/>
        <h2>Authentication</h2>
        <div class="group">
            <label for="new-user-newpassword"> New Password: </label>
            <input id="new-user-newpassword" type="password" v-model="newUser.newpassword">
        </div>
        <div class="group">
            <label for="new-user-retypepassword"> Retype Password: </label>
            <input id="new-user-retypepassword" type="password" v-model="newUser.retypepassword">
        </div>
         <button class="submit" id="auth" :disabled="!submitAuthEnabled" @click="editAuth">Update Authentication</button>
        <span class="profile-message"><br>{{authMessage}}<br></span>
        <br>
        <hr/>
        <h2>Consents</h2>
        <div class="nb-consent">
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
        <button class="submit" id="auth" :disabled="!submitConsentsEnabled" @click="editConsents">Update Consents</button>
        <span class="profile-message"><br>{{consentsMessage}}<br></span>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import { eventBus } from "../../main"
    import VueJwtDecode from "vue-jwt-decode";

    export default {
        name: "user-profile",
        props: {
            user: Object,
        },
        data() {
            return {
                newUser: {
                    username: "",
                    first: "",
                    last: "",
                    email: "",
                    newpassword: "",
                    retypepassword: "",
                },
                personalMessage: "",
                authMessage: "",
                consentsMessage: "",
                ucdavisIRB: null,
                nbIRB: null,
            }
        },
        created: function() {
            const token = localStorage.getItem("nb.user");
            if (token) {
                const decoded = VueJwtDecode.decode(token);
                if (decoded.user.username && decoded.user.username !== '') {
                        this.newUser.username = decoded.user.username
                        this.newUser.first = decoded.user.first_name
                        this.newUser.last = decoded.user.last_name
                        this.newUser.email = decoded.user.email
                } 
                decoded.user.Consents.forEach(consent => consent.name === 'NB' ? this.nbIRB = 'true' : null)
                decoded.user.Dissents.forEach(consent => consent.name === 'NB' ? this.nbIRB = 'false' : null)
                decoded.user.Consents.forEach(consent => consent.name === 'UCDAVIS' ? this.ucdavisIRB = 'true' : null)
                decoded.user.Dissents.forEach(consent => consent.name === 'UCDAVIS' ? this.ucdavisIRB = 'false' : null)
            }
        },
        watch: { // need to watch because the parent component takes some time to get the user before propogating here
            user: function (newVal) {
                this.newUser.username = newVal.username;
                this.newUser.email = newVal.email;
                this.newUser.first = newVal.first_name;
                this.newUser.last = newVal.last_name;
                newVal.Consents.forEach(consent => consent.name === 'NB' ? this.nbIRB = 'true' : null)
                newVal.Dissents.forEach(consent => consent.name === 'NB' ? this.nbIRB = 'false' : null)
                newVal.Consents.forEach(consent => consent.name === 'UCDAVIS' ? this.ucdavisIRB = 'true' : null)
                newVal.Dissents.forEach(consent => consent.name === 'UCDAVIS' ? this.ucdavisIRB = 'false' : null)

            }
        },
        computed: {
            needUCDIRB: function() {
                    return this.newUser.email.includes('@ucdavis.edu')
            },
            submitPersonalEnabled: function() {
                return this.newUser.username.length > 0
                && this.newUser.first.length > 0
                && this.newUser.last.length > 0
                && this.newUser.email.length > 0
            },
            submitAuthEnabled: function() {
                if (this.newUser.newpassword !== this.newUser.retypepassword) {
                    this.setAuthMessage("Passwords must match", false);
                } else {
                    this.setAuthMessage("", false);
                }
                return this.newUser.newpassword.length > 0 && this.newUser.newpassword === this.newUser.retypepassword
            },
            submitConsentsEnabled: function() {
                return this.nbIRB!== null && ((this.needUCDIRB && this.ucdavisIRB!== null) || (!this.needUCDIRB))
            },
        },
        methods: {
            editPersonal: function() {
                const token = localStorage.getItem("nb.user");
                const headers = { headers: { Authorization: 'Bearer ' + token }}
                axios.put("api/users/editPersonal", this.newUser, headers)
                .then((res) => {
                    localStorage.setItem("nb.user", res.data.token)
                    this.setPersonalMessage("Success: Personal Details saved");
                }).catch(() => {
                    this.setPersonalMessage("Error: This username or email is already taken. Please try again.", false)
                })
            },
            editAuth: async function() {
                const token = localStorage.getItem("nb.user");
                const headers = { headers: { Authorization: 'Bearer ' + token }}
                try {
                    await axios.put("api/users/editAuth", this.newUser, headers)
                    this.setAuthMessage("Success: New password saved", true)
                } catch (err) {
                    console.log(err)
                    console.log("Error: An error was encountered whne trying to update you password. Please try again.")
                }
            },
            editConsents: async function() {
                const token = localStorage.getItem("nb.user");
                const headers = { headers: { Authorization: 'Bearer ' + token }}
                try {
                    const consentRes = await axios.post(`/api/consent`, {name: 'NB', consent: this.nbIRB}, headers)
                    const t1 = consentRes.data.token
                    localStorage.setItem("nb.user", t1);

                    if (this.needUCDIRB) {
                        const h2 = { headers: { Authorization: 'Bearer ' + t1 }}
                        const consentRes = await axios.post(`/api/consent`, {name: 'UCDAVIS', consent: this.ucdavisIRB}, h2)
                        const t2 = consentRes.data.token
                        localStorage.setItem("nb.user", t2);
                    }
                    this.setConsentsMessage("Success: New consents saved", true)
                } catch (err) {
                    console.log(err)
                    console.log("Error: An error was encountered whne trying to update you password. Please try again.")
                }
            },
            resetForm: function() {
                this.newUser = {
                    username: "",
                    first: "",
                    last: "",
                    email: "",
                    newassword: "",
                }
            },
            setPersonalMessage: function(msg, disappear=true, error=false) {
                this.personalMessage = msg;
                if (disappear) {
                    setTimeout(() => this.personalMessage = "", 5000);
                }
            },
            setAuthMessage: function(msg, disappear=true) {
                this.authMessage = msg;
                if (disappear) {
                    setTimeout(() => this.authMessage = "", 5000);
                }
            },
            setConsentsMessage: function(msg, disappear=true) {
                this.consentsMessage = msg;
                if (disappear) {
                    setTimeout(() => this.consentsMessage = "", 5000);
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
    margin: auto;
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

  .profile-row {
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap; */
    /* width: 100%; */
  }
  .buttons {
    width: 380px;
    /* display: flex; */
    /* flex-direction: row; */
    /* padding: 20px; */
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

  button.cancel {
    width: 80px;
    align-self: flex-start;
    padding: 6px 0;
    border-radius: 5px;
    /* border: solid 1px #007bff; */
    /* background-color: #007bff; */
    /* color: #fff; */
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

  /* .profile-message {
    color: green;
  } */

  #profile-info-box {
    border: 1px solid;
    padding: 6px 6px 6px 6px;
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