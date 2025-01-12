import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(CameraType.back);
  const [cameraReady, setCameraReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const handleCameraError = (error) => {
    console.error('Camera error:', error);
  };

  if (hasPermission === null) {
    return <View><Text>Requesting camera permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // The Solution: Check cameraReady after a timeout
  const cameraStartTimeout = setTimeout(() => {
    setCameraReady(true)
  }, 5000)
  // Clean up when component unmounts
  React.useEffect(() => {
    return () => clearTimeout(cameraStartTimeout)
  }, [])

  return (
    <Camera style={{ flex: 1 }} type={type} onCameraReady={handleCameraReady} onError={handleCameraError}>
      {cameraReady && <View>Camera is Ready</View>}
    </Camera>
  );
};

export default CameraComponent;