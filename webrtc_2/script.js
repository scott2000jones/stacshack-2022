const pc1 = new RTCPeerConnection();
const pc2 = new RTCPeerConnection();
pc1.onicecandidate = e => pc2.addIceCandidate(e.candidate);
pc2.onicecandidate = e => pc1.addIceCandidate(e.candidate);
const id2content  = {};

pc2.ontrack = e => {
	const track = e.track;
  const stream = e.streams[0];
  console.log('got track id=' + track.id, track);
  console.log('stream id=' + stream.id, stream);
  console.log('content', id2content[stream.id]);
}
async function negotiate() {
	await pc1.setLocalDescription();
  const msids = pc1.localDescription.sdp.split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('a=msid:'));
  console.log('offer msids', msids);
  await pc2.setRemoteDescription(pc1.localDescription);
	await pc2.setLocalDescription();
  await pc1.setRemoteDescription(pc2.localDescription);  
}
document.getElementById('run').addEventListener('click', async ()  => {
  const stream = await navigator.mediaDevices.getUserMedia({video: true});
  console.log('local stream id=' + stream.id, stream);  
  id2content[stream.id] = 'webcam';
  stream.getTracks().forEach(t => pc1.addTrack(t, stream));
  negotiate();
});

document.getElementById('share').addEventListener('click', async ()  => {
  const stream = await navigator.mediaDevices.getDisplayMedia({video: true});
  console.log('local screen id=' + stream.id, stream);
  id2content[stream.id] = 'screen';
  stream.getTracks().forEach(t => pc1.addTrack(t, stream));  
  negotiate();
});
