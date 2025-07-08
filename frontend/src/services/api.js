const API_URL = import.meta.env.VITE_API_URL || "https://19hnincl9mo3.manus.space/api"

export const fetchMentorTemplates = async () => {
  try {
    const response = await fetch(`${API_URL}/mentor-templates`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch mentor templates:", error)
    // Fallback to static data if API fails
    return {
      Business: [
        { id: "startup_strategy", name: "Startup Strategy Advisor" },
        { id: "sales_coach", name: "Sales Performance Coach" },
        { id: "leadership_mentor", name: "Leadership Development Mentor" },
        { id: "marketing_strategist", name: "Digital Marketing Strategist" },
      ],
      Education: [
        { id: "study_skills", name: "Study Skills Coach" },
        { id: "career_counselor", name: "Career Development Counselor" },
      ],
      Creative: [{ id: "writing_mentor", name: "Creative Writing Mentor" }],
      Technology: [{ id: "programming_mentor", name: "Programming Mentor" }],
      Wellness: [{ id: "mindfulness_guide", name: "Mindfulness & Meditation Guide" }],
    }
  }
}

export const postChatMessage = async (mentorId, history) => {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mentor_id: mentorId,
      history: history,
    }),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to get response from mentor")
  }
  return await response.json()
}
