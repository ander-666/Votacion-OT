import styled from "styled-components";

const PlaylistContainer = styled.div`
  max-width: 800px;
  height: 800px;
  width: 800px;
  margin: auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  text-align: center;
  overflow-y: auto; /* Habilita el scroll vertical */
`;

export default function OTPlaylist() {
  return (
    <PlaylistContainer>
      <h2>Playlist de OT</h2>
      <iframe
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4fpCWaHOned"
        width="100%"
        height="530%"
        frameBorder="0"
        allow="encrypted-media"
        title="OT Playlist"
      ></iframe>
    </PlaylistContainer>
  );
}
