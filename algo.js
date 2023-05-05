{/* <script src="https://cdn.jsdelivr.net/npm/p5@1.6.0/lib/p5.js"></script>
  <script src="https://tonejs.github.io/build/Tone.js"></script> */}
//   <script>
      
// Global Variables
// ----------------

import * as Tone from 'tone'

const synths = []  

const notes = [
    'C#3', 'D#3', 'E3', 'F#3', 'G#3', 'A3', 'B3',
    'C#4', 'D#4', 'E4', 'F#4', 'G#4', 'A4', 'B4',
    'C#5', 'D#5', 'E5', 'F#5', 'G#5', 'A5', 'B5',
]

const cols = 21
const diam = 20
const balls = []

const reverb = new Tone.Reverb({
    decay: 3,
    wet: 0.5
}).toDestination()

// Function to calculate ball positions
// ------------------------------------

function createBall (i) {
    const offsetX = innerWidth / 2 - ((cols * diam) / 2)
    const x = i * diam + offsetX
    const y = innerHeight / 2
    const r = diam / 2
    return { x, y, r }
}

// p5.js Setup/Draw
// -----------------

function setup () {
    createCanvas(innerWidth, innerHeight)
    
    for (let i = 0; i < cols; i++) {
    // create circles
    balls.push(createBall(i))
    // create synths
    const s = new Tone.PolySynth()
        s.connect(reverb)
    synths.push(s)
    }
}

function draw () {
    background(220)
        
    // update circles
    const range = height / 4
    const offset = height / 2
    const g = height * 0.75
    balls.forEach((b, i) => {
    // adjust y
    const scaler = i * 0.0002 + 0.02
    b.y = Math.sin(frameCount * scaler) * range + offset
    // -----------
            // play tone 
    // -----------
            if (b.y >= g - 1) {
        fill(255)
                const n = notes[i]
                const s = synths[i]
            s.triggerAttackRelease(n, '8n', Tone.now(), 0.25)
            } else {
        fill(220)
    }
    // draw circle
    circle(b.x, b.y, b.r * 2)
    })
    
    // draw springs
    for (let i = 0; i < cols - 1; i++) {
    const a = balls[i]
    const b = balls[i + 1]
    line(a.x, a.y, b.x, b.y)
    }
    
    // draw floor
        line(width * 0.2, g, width * 0.8, g)
}
  
//   </script>