"use client";

import { useEffect, useState } from "react";

type Experience = {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  currentJob: boolean;
  description: string;
};

type Education = {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
};

export default function ResumePage() {
  const [fullName, setFullName] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const RESUME_STORAGE_KEY = "cmproai_resume";
  useEffect(() => {
  const savedResume = localStorage.getItem(RESUME_STORAGE_KEY);

  if (!savedResume) {
    return;
  }

  try {
    const resumeData = JSON.parse(savedResume);

    setFullName(resumeData.fullName || "");
    setProfessionalTitle(resumeData.professionalTitle || "");
    setEmail(resumeData.email || "");
    setPhone(resumeData.phone || "");
    setLocation(resumeData.location || "");
    setSummary(resumeData.summary || "");
    setSkills(resumeData.skills || "");
    setExperiences(resumeData.experiences || []);
    setEducations(resumeData.educations || []);
  } catch (error) {
    console.error("Failed to load saved resume:", error);
  }
}, []);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      currentJob: false,
      description: "",
    },
  ]);

  const [educations, setEducations] = useState<Education[]>([]);

  useEffect(() => {
  const savedResume = localStorage.getItem("cmproai_resume");

  if (!savedResume) {
    return;
  }

  try {
    const resumeData = JSON.parse(savedResume);

    setFullName(resumeData.fullName || "");
    setProfessionalTitle(resumeData.professionalTitle || "");
    setEmail(resumeData.email || "");
    setPhone(resumeData.phone || "");
    setLocation(resumeData.location || "");
    setSummary(resumeData.summary || "");
    setSkills(resumeData.skills || "");

    if (Array.isArray(resumeData.experiences)) {
      setExperiences(resumeData.experiences);
    }

    if (Array.isArray(resumeData.educations)) {
      setEducations(resumeData.educations);
    }
  } catch (error) {
    console.error("Failed to load saved resume:", error);
  }
}, []);

  // =========================
  // EXPERIENCE FUNCTIONS
  // =========================

  const addExperience = () => {
    setExperiences((current) => [
      ...current,
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        currentJob: false,
        description: "",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences((current) =>
      current.filter((_, experienceIndex) => experienceIndex !== index)
    );
  };

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string | boolean
  ) => {
    setExperiences((current) =>
      current.map((experience, experienceIndex) =>
        experienceIndex === index
          ? {
              ...experience,
              [field]: value,
            }
          : experience
      )
    );
  };

  // =========================
  // EDUCATION FUNCTIONS
  // =========================

  const addEducation = () => {
    setEducations((current) => [
      ...current,
      {
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const removeEducation = (index: number) => {
    setEducations((current) =>
      current.filter((_, educationIndex) => educationIndex !== index)
    );
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    setEducations((current) =>
      current.map((education, educationIndex) =>
        educationIndex === index
          ? {
              ...education,
              [field]: value,
            }
          : education
      )
    );
  };

  // =========================
  // SAVE RESUME
  // =========================

const saveResume = () => {
  // =========================
  // BASIC VALIDATION
  // =========================

  if (!fullName.trim()) {
    alert("Please enter your full name.");
    return;
  }

  if (!professionalTitle.trim()) {
    alert("Please enter your professional title.");
    return;
  }

  if (!email.trim()) {
    alert("Please enter your email address.");
    return;
  }

  // Basic email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // =========================
// EXPERIENCE VALIDATION
// =========================

for (let i = 0; i < experiences.length; i++) {
  const experience = experiences[i];
  const experienceNumber = i + 1;

  if (!experience.jobTitle.trim()) {
    alert(
      `Experience ${experienceNumber}: Please enter the job title.`
    );
    return;
  }

  if (!experience.company.trim()) {
    alert(
      `Experience ${experienceNumber}: Please enter the company name.`
    );
    return;
  }

  if (!experience.startDate) {
    alert(
      `Experience ${experienceNumber}: Please enter the start date.`
    );
    return;
  }

  if (!experience.currentJob && !experience.endDate) {
    alert(
      `Experience ${experienceNumber}: Please enter the end date or select "I currently work here".`
    );
    return;
  }
}

// =========================
// EDUCATION VALIDATION
// =========================

for (let i = 0; i < educations.length; i++) {
  const education = educations[i];
  const educationNumber = i + 1;

  if (!education.school.trim()) {
    alert(
      `Education ${educationNumber}: Please enter the school or university.`
    );
    return;
  }

  if (!education.degree.trim()) {
    alert(
      `Education ${educationNumber}: Please enter the degree or program.`
    );
    return;
  }

  if (!education.startDate) {
    alert(
      `Education ${educationNumber}: Please enter the start date.`
    );
    return;
  }

  if (!education.endDate) {
    alert(
      `Education ${educationNumber}: Please enter the end date.`
    );
    return;
  }
}

  // =========================
  // SAVE
  // =========================

const resumeData = {
  fullName,
  professionalTitle,
  email,
  phone,
  location,
  summary,
  experiences,
  educations,
  skills,
};

localStorage.setItem(
  RESUME_STORAGE_KEY,
  JSON.stringify(resumeData)
);

console.log("CMproAI Resume Data:", resumeData);

alert("Resume information saved successfully!");
};

const clearResume = () => {
  const confirmed = window.confirm(
    "Are you sure you want to clear this resume?"
  );

  if (!confirmed) {
    return;
  }

  localStorage.removeItem("cmproai_resume");

  setFullName("");
  setProfessionalTitle("");
  setEmail("");
  setPhone("");
  setLocation("");
  setSummary("");
  setSkills("");

  setExperiences([
    {
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      currentJob: false,
      description: "",
    },
  ]);

  setEducations([]);

  alert("Resume cleared successfully!");
};

  return (
    
    <main className="min-h-screen bg-slate-950 text-white">
  <style>{`
  @media print {

    @page {
      size: A4;
      margin: 0;
    }

    html,
    body {
      background: white !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    body * {
      visibility: hidden !important;
    }

    #resume-print,
    #resume-print * {
      visibility: visible !important;
    }

    #resume-print {
      position: absolute;
      left: 0;
      top: 0;

      width: 210mm;
      min-height: 297mm;

      margin: 0 !important;
      padding: 18mm !important;

      background: white !important;
      color: #111827 !important;

      border: none !important;
      border-radius: 0 !important;
      box-shadow: none !important;

      box-sizing: border-box;
    }

    #resume-print h1,
    #resume-print h2,
    #resume-print h3,
    #resume-print p {
      break-inside: avoid;
    }

    #resume-print > div {
      break-inside: auto;
    }
  }
`}</style>

      <section className="mx-auto max-w-5xl px-6 py-10">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-10">
          <p className="text-sm font-medium text-cyan-400">
            CMproAI RESUME BUILDER
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Build Your Resume
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Create your professional resume once, then use CMproAI
            to tailor it for different job opportunities.
          </p>
        </div>

        {/* =========================
            PERSONAL INFORMATION
        ========================= */}

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">
            Personal Information
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Professional Title
              </label>

              <input
                type="text"
                placeholder="e.g. Customer Support Specialist"
                value={professionalTitle}
                onChange={(e) => setProfessionalTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Phone
              </label>

              <input
                type="tel"
                placeholder="+63 XXX XXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-slate-300">
                Location
              </label>

              <input
                type="text"
                placeholder="City, Country"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

          </div>
        </section>

        {/* =========================
            PROFESSIONAL SUMMARY
        ========================= */}

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-xl font-semibold">
            Professional Summary
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Give employers a quick overview of your experience,
            strengths, and career goals.
          </p>

          <textarea
            rows={6}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Write your professional summary..."
            className="mt-5 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

        </section>

        {/* =========================
            WORK EXPERIENCE
        ========================= */}

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-semibold">
                Work Experience
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Add your previous jobs and responsibilities.
              </p>
            </div>

            <button
              type="button"
              onClick={addExperience}
              className="rounded-lg border border-cyan-400 px-4 py-2 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-950"
            >
              + Add Experience
            </button>

          </div>

          <div className="mt-6 space-y-6">

            {experiences.map((experience, index) => (

              <div
                key={index}
                className="rounded-xl border border-slate-700 bg-slate-950 p-6"
              >

                {/* EXPERIENCE HEADER */}

                <div className="flex items-center justify-between">

                  <h3 className="text-lg font-semibold">
                    Experience {index + 1}
                  </h3>

                  {experiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}

                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">

                  {/* JOB TITLE */}

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Job Title
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Customer Support Specialist"
                      value={experience.jobTitle}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "jobTitle",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* COMPANY */}

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Company
                    </label>

                    <input
                      type="text"
                      placeholder="Company name"
                      value={experience.company}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "company",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* START DATE */}

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Start Date
                    </label>

                    <input
                      type="month"
                      value={experience.startDate}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "startDate",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* END DATE + CURRENT JOB */}

                  <div>

                    <label className="mb-2 block text-sm text-slate-300">
                      End Date
                    </label>

                    <input
                      type="month"
                      value={experience.endDate}
                      disabled={experience.currentJob}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "endDate",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                    />

                    {/* CURRENT JOB CHECKBOX */}

                    <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-slate-400">

                      <input
                        type="checkbox"
                        checked={experience.currentJob}
                        onChange={(e) => {
                          const checked = e.target.checked;

                          updateExperience(
                            index,
                            "currentJob",
                            checked
                          );

                          if (checked) {
                            updateExperience(
                              index,
                              "endDate",
                              ""
                            );
                          }
                        }}
                        className="h-4 w-4 accent-cyan-400"
                      />

                      I currently work here

                    </label>

                  </div>

                  {/* DESCRIPTION */}

                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm text-slate-300">
                      Description
                    </label>

                    <textarea
                      rows={5}
                      placeholder="Describe your responsibilities and achievements..."
                      value={experience.description}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* =========================
            EDUCATION
        ========================= */}

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-semibold">
                Education
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Add your educational background.
              </p>
            </div>

            <button
              type="button"
              onClick={addEducation}
              className="rounded-lg border border-cyan-400 px-4 py-2 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-950"
            >
              + Add Education
            </button>

          </div>

          <div className="mt-6 space-y-6">

            {educations.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center">
                <p className="text-slate-500">
                  No education added yet.
                </p>
              </div>
            )}

            {educations.map((education, index) => (

              <div
                key={index}
                className="rounded-xl border border-slate-700 bg-slate-950 p-6"
              >

                <div className="flex items-center justify-between">

                  <h3 className="text-lg font-semibold">
                    Education {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>

                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">

                  {/* SCHOOL */}

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      School / University
                    </label>

                    <input
                      type="text"
                      placeholder="School or university"
                      value={education.school}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "school",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* DEGREE */}

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Degree / Program
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Bachelor of Science"
                      value={education.degree}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "degree",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* EDUCATION START */}

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Start Date
                    </label>

                    <input
                      type="month"
                      value={education.startDate}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "startDate",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* EDUCATION END */}

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      End Date
                    </label>

                    <input
                      type="month"
                      value={education.endDate}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "endDate",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* =========================
            SKILLS
        ========================= */}

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-xl font-semibold">
            Skills
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Add skills that are relevant to the jobs you want.
          </p>

          <input
            type="text"
            placeholder="e.g. Customer Service, CRM, Communication"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="mt-5 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

        </section>

                {/* =========================
            RESUME PREVIEW
        ========================= */}

        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

  <div>
    <p className="text-sm font-medium text-cyan-400">
      RESUME PREVIEW
    </p>

    <h2 className="mt-1 text-2xl font-bold">
      Your Resume
    </h2>

    <p className="mt-2 text-sm text-slate-400">
      Review your resume before printing or saving it.
    </p>
  </div>

  <button
    type="button"
    onClick={() => window.print()}
    className="rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
  >
    🖨️ Print / Save PDF
  </button>

</div>

          <div
  id="resume-print"
  className="rounded-xl bg-white p-8 text-slate-900"
>

            {/* NAME & TITLE */}

            <div className="border-b border-slate-300 pb-5">

              <h1 className="text-3xl font-bold">
                {fullName || "Your Name"}
              </h1>

              <p className="mt-1 text-lg text-slate-600">
                {professionalTitle || "Professional Title"}
              </p>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">

                {email && <span>{email}</span>}

                {phone && <span>{phone}</span>}

                {location && <span>{location}</span>}

              </div>

            </div>

            {/* SUMMARY */}

            {(summary || true) && (
              <div className="mt-6">

                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  Professional Summary
                </h2>

                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                  {summary || "Your professional summary will appear here."}
                </p>

              </div>
            )}

            {/* EXPERIENCE */}

            <div className="mt-6">

              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                Work Experience
              </h2>

              <div className="mt-4 space-y-5">

                {experiences.map((experience, index) => (

                  <div key={index}>

                    <div className="flex flex-col justify-between sm:flex-row">

                      <div>
                        <h3 className="font-semibold">
                          {experience.jobTitle || "Job Title"}
                        </h3>

                        <p className="text-sm text-slate-600">
                          {experience.company || "Company"}
                        </p>
                      </div>

                      <p className="text-sm text-slate-500">

                        {experience.startDate || "Start Date"}

                        {" — "}

                        {experience.currentJob
                          ? "Present"
                          : experience.endDate || "End Date"}

                      </p>

                    </div>

                    {experience.description && (
                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                        {experience.description}
                      </p>
                    )}

                  </div>

                ))}

              </div>

            </div>

            {/* EDUCATION */}

            {educations.length > 0 && (
              <div className="mt-6">

                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  Education
                </h2>

                <div className="mt-4 space-y-4">

                  {educations.map((education, index) => (

                    <div key={index}>

                      <div className="flex flex-col justify-between sm:flex-row">

                        <div>

                          <h3 className="font-semibold">
                            {education.degree || "Degree / Program"}
                          </h3>

                          <p className="text-sm text-slate-600">
                            {education.school || "School / University"}
                          </p>

                        </div>

                        <p className="text-sm text-slate-500">

                          {education.startDate || "Start Date"}

                          {" — "}

                          {education.endDate || "End Date"}

                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>
            )}

            {/* SKILLS */}

            {skills && (
              <div className="mt-6">

                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  Skills
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {skills}
                </p>

              </div>
            )}

          </div>

        </section>

{/* =========================
    SAVE RESUME
========================= */}

<div className="mt-8 flex flex-wrap justify-end gap-3">

  <button
    type="button"
    onClick={clearResume}
    className="rounded-full border border-red-400 px-8 py-4 font-semibold text-red-400 transition hover:bg-red-400 hover:text-white"
  >
    Clear Resume
  </button>

  <button
    type="button"
    onClick={saveResume}
    className="rounded-full bg-cyan-400 px-8 py-4 font-semibold text-slate-950 transition hover:bg-cyan-300"
  >
    Save Resume
  </button>

</div>

</section>
</main>
  );
}