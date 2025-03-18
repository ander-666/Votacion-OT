export async function voteForParticipant(participantId) {
    const token = localStorage.getItem("jwtToken");
  
    const response = await fetch("http://localhost:8000/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ participantId })
    });
  
    if (!response.ok) throw new Error("Error al votar");
    return response.json();
  }
  