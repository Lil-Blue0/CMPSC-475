export const scheduleData = {
  priorities: [
    "CMPSC 431W (Top Priority - Catch-Up)",
    "STAT 318 (High Priority - Catch-Up)",
    "MATH 220 (High Priority - Catch-Up)",
    "PHYS 214 (Daily Priority - Accelerated Class)",
    "CMPSC 475 (Normal Study)",
    "CMLIT 128N (Normal Study)",
  ],
  mwf: {
    day: "Monday / Wednesday / Friday",
    classes: [
      { time: "11:15am - 12:05pm", name: "CMPSC 475" },
      { time: "1:25pm - 2:15pm", name: "CMLIT 128N" },
      { time: "2:30pm - 3:20pm", name: "MATH 220" },
    ],
    studyPlan: [
      {
        time: "9:00am - 10:00am",
        title: "Block 1: PHYS 214 (Async)",
        description: "Work on this accelerated class every day while fresh.",
      },
      {
        time: "10:00am - 11:00am",
        title: "Block 2: CMPSC 431W (Database)",
        description:
          "Top priority catch-up. Re-watch lectures, redo assignments, or read the textbook.",
      },
      {
        time: "3:30pm - 4:30pm",
        title: "Block 3: MATH 220 (Matrices)",
        description:
          "Crucial: Review new material from class immediately, then spend the rest of the time on catch-up and homework.",
      },
      {
        time: "4:30pm - 5:30pm",
        title: "Block 4: STAT 318 (Probability)",
        description:
          "Second-highest priority. This is a pure catch-up and practice-problem session.",
      },
      {
        time: "5:30pm - 6:30pm",
        title: "Block 5: Maintenance",
        description:
          "CMPSC 475 (30-40 min): Work on homework for this class.\nCMLIT 128N (20-30 min): Do the required reading.",
      },
    ],
  },
  tth: {
    day: "Tuesday / Thursday",
    classes: [
      { time: "1:35pm - 2:50pm", name: "CMPSC 431W" },
      { time: "3:15pm - 4:30pm", name: "STAT 318" },
    ],
    studyPlan: [
      {
        time: "9:00am - 10:00am",
        title: "Block 1: PHYS 214 (Async)",
        description:
          "Same as MWF. Keep the momentum on this accelerated class.",
      },
      {
        time: "10:00am - 11:00am",
        title: "Block 2: MATH 220 (Matrices)",
        description:
          "Dedicated catch-up block for Matrices. Focus on practice problems and understanding concepts.",
      },
      {
        time: "11:00am - 12:00pm",
        title: "Block 3: Maintenance",
        description:
          "CMPSC 475 (30-40 min): Catch up on programming assignments.\nCMLIT 128N (20-30 min): Get ahead on reading.",
      },
      {
        time: "4:30pm - 5:30pm",
        title: "Block 4: CMPSC 431W (Database)",
        description:
          "Crucial: Review new database concepts from class immediately, then work on catch-up.",
      },
      {
        time: "5:30pm - 6:30pm",
        title: "Block 5: STAT 318 (Probability)",
        description:
          "Crucial: Redo example problems from class, then move on to homework and catch-up.",
      },
    ],
  },
};
