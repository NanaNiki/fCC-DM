// Import necessary React and ReactDOM hooks and libraries
const { useState, useEffect } = React;
const { render } = ReactDOM;

/* `const audioClips` is an array of objects where each object
 * has four properties: `keyCode` (the key code that triggers the audio clip),
 * `keyTrigger` (the key that triggers the audio clip), `trackId`
 * (the name of the audio clip), and `src` (the URL of the audio file). */
const audioClips = [
  {
    keyCode: "81",
    keyTrigger: "Q",
    trackId: "Riser FX",
    src: "https://d9olupt5igjta.cloudfront.net/samples/sample_files/195035/6be12d914b0e328dbb02af9f2d351f8f783de70e/mp3/_FX_-_3_Trees.mp3?1677922698",
  },
  {
    keyCode: "87",
    keyTrigger: "W",
    trackId: "Reversed Synth",
    src: "https://d9olupt5igjta.cloudfront.net/samples/sample_files/24805/09bde3f0f1f1b9a9bc71ae24062f346878457d21/mp3/_Loop_1__.mp3?1565595300",
  },
  {
    keyCode: "69",
    keyTrigger: "E",
    trackId: "Buzzy & Wobbly Bass",
    src: "https://d9olupt5igjta.cloudfront.net/samples/sample_files/201396/a2c09e85ac3c4b2c48a284fab658d39d1e73937b/mp3/_Reese_-_detune_downd_172_Bpm_C_Min.mp3?1680032491",
  },
  {
    keyCode: "65",
    keyTrigger: "A",
    trackId: "Riddim Bass Loop",
    src: "https://d9olupt5igjta.cloudfront.net/samples/sample_files/193666/1229b38803cff6ef76fff51ff7c2ff3ca043078d/mp3/_XANS_bass_loop_02_E.mp3?1677536636",
  },
  {
    keyCode: "83",
    keyTrigger: "S",
    trackId: "Pre Drop FX",
    src: "https://d9olupt5igjta.cloudfront.net/samples/sample_files/200361/64a3089a9ab53089d553fdc1c538f0fe2f4b5f8a/mp3/_AKAS_DL3.mp3?1679824326",
  },
  {
    keyCode: "68",
    keyTrigger: "D",
    trackId: "Trance Acid FX",
    src: "https://d9olupt5igjta.cloudfront.net/samples/sample_files/191169/bd4d87ff78be026cfc6cdf64292bcded3338f607/mp3/_trance_sound.mp3?1676479938",
  },
  {
    keyCode: "90",
    keyTrigger: "Z",
    trackId: "''Runna'' Break",
    src: "https://d9olupt5igjta.cloudfront.net/samples/sample_files/199305/1e4a3fd794a13a2609761749293852d2e061b4d2/mp3/_Soul_Beat_Runna.mp3?1679358748",
  },
  {
    keyCode: "88",
    keyTrigger: "X",
    trackId: "'Woo' Vocal FX",
    src: "https://d9olupt5igjta.cloudfront.net/samples/sample_files/191377/eadab2edd59272e6250d2375fff56a4195a95e9a/mp3/_woo-vocal-fx-shot_130bpm_G_major.mp3?1676575283",
  },
  {
    keyCode: "67",
    keyTrigger: "C",
    trackId: "'Hey!' Chant FX",
    src: "https://d9olupt5igjta.cloudfront.net/samples/sample_files/192561/489891762cf6e1e33d0431279fb76d5834378f4d/mp3/_vox-hey_130bpm_B_major.mp3?1677101356",
  },
];

/**
 * Main component of the Drum Machine application. It includes state variables for toggling
 * between light and dark mode, the name of the currently selected sample, the volume, and the record
 * of the user's actions. It also includes functions for playing a sound, playing back a recording,
 * and adjusting the volume.
 */
function App() {
  // Initialize state variables
  const [nameSample, setNameSample] = useState("Sample ID");
  const [volume, setVolume] = useState(1);
  const [record, setRecord] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Toggle the dark mode state variable
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  /**
   * Use an effect hook to add or remove the "dark-mode" class from the root HTML
   * element, depending on the value of the dark mode state variable
   */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  /**
   * Play a sound based on the given selector (the key pressed by the user)
   * @param {string} selector - The selector for the sound to be played
   */
  function playSound(selector) {
    const audio = document.getElementById(selector);
    audio.currentTime = 0;
    audio.play();
    audio.volume = volume;
    setNameSample(audio.parentNode.id);
    setRecord((prev) => prev + audio.id + " ");
  }

  /**
   * Use an effect hook to add an event listener for keydown events.
   * When a key is pressed, call the playSound function with the
   * uppercase version of the key as the selector
   */
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      playSound(event.key.toUpperCase());
    });
  }, []);

  /**
   * Play back the user's recording by splitting the record string into an array,
   * then playing each sound in the array with a delay of 600 milliseconds
   * between each sound
   */
  const playRecording = () => {
    let recordArr = record.split(" ");
    let i = 0;
    const interval = setInterval(() => {
      const audio = document.getElementById(recordArr[i]);
      audio.currentTime = 0;
      audio.play();
      audio.volume = volume;
      i++;
    }, 600);
    setTimeout(() => clearInterval(interval), 600 * recordArr.length - 1);
  };

  /**
   * React component that renders a drum machine with different drum pads.
   * The component includes features such as dark mode, volume control, recording
   * and playing back a sequence of drum beats, and links to the developer's profile page on freeCodeCamp website.
   * @param {boolean} darkMode - A boolean value indicating whether the dark mode is enabled or disabled.
   * @param {function} toggleDarkMode - A function that toggles the state of the dark mode.
   * @param {string} nameSample - A string that represents the current name of the drum sample being played.
   * @param {number} volume - A number between 0 and 1 that represents the current volume level of the drum machine.
   * @param {function} setVolume - A function that updates the volume level of the drum machine.
   * @param {string} record - A string that represents the recorded sequence of drum beats.
   * @param {function} setRecord - A function that updates the recorded sequence of drum beats.
   * @param {Array} audioClips - An array of objects that contain information about each drum pad, such as the key code,
   * the key trigger, the source of the audio clip, and the track ID.
   * @param {function} playSound - A function that plays the audio clip of the drum pad that is clicked.
   * @param {function} playRecording - A function that plays back the recorded sequence of drum beats.
   * @returns {JSX.Element} The JSX representation of the drum machine component.
   */
  return (
    <>
      <div className="app p-3 dark-mode" id="drum-machine">
        <button className="float-end moon mt-4 me-3" onClick={toggleDarkMode}>
          {darkMode ? (
            <i className="fa-solid fa-sun"></i>
          ) : (
            <i className="fa-solid fa-moon"></i>
          )}
        </button>
        <h1 class="text-emphasis text-center ms-5 me-4 mt-4" id="title">
          Drum Machine
        </h1>
        <div className="row justify-content-center mt-5">
          <div className="container" id="display">
            {nameSample}
          </div>
        </div>
        <div className="row justify-content-center mt-3">
          <label className="form-label text-center">Volume</label>
          <input
            className="form-range mb-3"
            id="display"
            type="range"
            step="0.01"
            onChange={(e) => setVolume(e.target.value)}
            value={volume}
            max="1"
            min="0"
          ></input>
        </div>
        <div className="row justify-content-center box">
          <text className="text-center">{record}</text>
          <>
            <button onClick={playRecording} className="btn rec play">
              Play
            </button>
            <button onClick={() => setRecord("")} className="btn rec clear">
              Clear
            </button>
          </>
        </div>

        <div className="box justify-content-center">
          <div className="drumpads">
            {audioClips.map((audioClips) => (
              <div
                class="drum-pad btn"
                id={audioClips.trackId}
                key={audioClips.keyCode}
                setRecord={setRecord}
                onClick={() => {
                  playSound(audioClips.keyTrigger);
                }}
              >
                {audioClips.keyTrigger}
                <audio
                  className="clip"
                  id={audioClips.keyTrigger}
                  src={audioClips.src}
                  volume={volume}
                  setRecord={setRecord}
                ></audio>
              </div>
            ))}
          </div>
        </div>

        <div className="footer">
          Made with <i className="fa-regular fa-heart fa-xs"></i> by
          <a
            href="https://www.freecodecamp.org/NanaNiki"
            target="_blank"
            className="nana"
          >
            {" "}
            Nicol
          </a>
        </div>
      </div>
    </>
  );
}

/**
 * Renders the App component to the DOM.
 * @function
 * @name render
 * @param {ReactElement} App - The root component of the application.
 * @param {HTMLElement} root - The DOM element to which the App component should be rendered.
 */
ReactDOM.render(<App />, document.getElementById("root"));
