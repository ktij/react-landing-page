import styled, { css } from 'styled-components'
import LoadingOverlay from 'react-loading-overlay'

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const Background = () => {
  return (
    <DarkBackground disappear={false}>
      {/* <Loader
        loaded={false}
        lines={13}
        length={20}
        width={10}
        radius={30}
        corners={1}
        rotate={0}
        direction={1}
        color="#a5d8ff"
        speed={1}
        trail={60}
        shadow={false}
        hwaccel={false}
        className="spinner"
        zIndex={2e9}
        top="50%"
        left="50%"
        scale={1.0}
        loadedClassName="loadedContent"
      />*/}
      <LoadingOverlay
        active={true}
        // spinner={<BounceLoader />}
        spinner={true}
        text="Loading your content..."
      >
        {/* <p>Some content or children or something.</p> */}
      </LoadingOverlay>
    </DarkBackground>
)
}

export default Background