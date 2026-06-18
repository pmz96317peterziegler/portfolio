# Portfolio Content — Peter Ziegler

---

## Identity

- **Name:** Peter Ziegler
- **Role:** Mechanical Engineering Student
- **Email:** pete.m.ziegler@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/pziegler1/
- **Resume:** /resume/resumePdf.pdf

---

## Hero Section

**Greeting:** Hi, my name is

**Subtitle:** I love to build things.

**Hero bio:**
I'm a Mechanical Engineering student at UGA drawn to robotics, automation, and industrial technology. I like working at the intersection of physical systems and digital control, whether that's solving inverse kinematics for a 6-DOF arm or pulling sensor data off a factory floor with MQTT.

---

## About Section

**Bio paragraph 1:**
I absolutely love robotics and automation — the idea that code can move real things in the physical world is endlessly exciting. I'm a Mechanical Engineering student at the University of Georgia, and I've spent my college years trying to close the gap between textbook physics and real-world systems.

**Bio paragraph 2:**
Something that really drives me: systems that work end-to-end. Whether that's a Python-based inverse kinematics solver for a 6-DOF arm, an MQTT telemetry network for an industrial site, or an autonomous robot navigating obstacles — I care about the full stack from sensor to actuator. Outside of engineering I volunteer with the Brooklyn Cemetery restoration project in Athens.

**Bio paragraph 3:**
I'm always looking for opportunities to work on meaningful engineering problems. Feel free to reach out if you'd like to build something together!

---

## Work Experience

### UGA Physical AI Lab
- **Role:** Undergraduate Research Assistant
- **Dates:** Jan 2026 — Present
- **Description:**
  - Collected 100 iterations of demonstration data via teleoperation
  - Trained a robot arm via imitation learning to perform basic tasks without human intervention
  - Currently researching 8 VLA policies to improve the accuracy and precision of robot actions

---

### Southern Flow
- **Role:** Automation Engineering Intern
- **Dates:** May 2025 — Aug 2025
- **Description:**
  - Designed a proof-of-concept diaphragm seal fill station with the potential to reduce subcontractor labor costs by ~40%
  - Developed an MQTT-enabled Remote Telemetry Unit and documented the full fabrication process in a 22-page manual
  - Configured a protocol gateway bridging Modbus RTU (RS-485) to Ethernet TCP
  - Created AutoCAD LT wiring diagrams for PLC IO cards across 4 sites

---

## Projects

### Inverse Kinematics Solver *(Featured)*
**Tags:** Python, Robotics, Kinematics, CoppeliaSim, Simulation
**Date:** Jan 2026

**Description:**
This project builds a numerical inverse kinematics solver for a 6-DOF UR5 robotic arm. Given a desired position and orientation for the end-effector, the solver finds the six joint angles that put the arm there. I described the robot's geometry using a standard Denavit-Hartenberg parameter table, then wrote a forward kinematics routine that chains the six joint transforms together to compute where the end-effector currently is for any set of joint angles. The IK solver is iterative: at each step it computes the 6D error between the current and target poses, builds the Jacobian matrix that relates joint velocities to end-effector velocities, and uses that relationship to figure out a small joint update that should reduce the error. Repeat until the error drops below a tolerance. To validate it, I plugged the output joint angles into a CoppeliaSim UR5 model and confirmed the simulated arm lands at the desired pose.

The two parts I found most interesting to work through were the orientation error and the step size. Position error is easy because you can subtract two 3D vectors, but orientation error needs more thought since you can't subtract two rotation matrices in a meaningful way. I computed the rotation that takes the current orientation to the target, then pulled the rotation angle out using the trace of that matrix and the rotation axis out of its off-diagonal entries. That gave me a single 3D vector representing "how much to rotate, and around what axis" that fits into the same error format as position. The step size turned out to be more interesting than I expected. The full Newton step is fast near the solution but can overshoot when you're far from it, so scaling each update by a fraction makes the solver more stable at the cost of more iterations. I tested several values and plotted the convergence behavior. The full step converged in 9 iterations but bounced around at one point along the way, while smaller steps were slower but near completely linear.

---

### Gait Analysis Model *(Featured)*
**Tags:** *(none)*
**Date:** *(none set)*

**Description:**
This project performs an inverse dynamics analysis on a person's leg during gait, using marker motion capture data and ground reaction force measurements to calculate the internal forces and moments at the ankle, knee, and hip joints over time. I built a 2D model of the foot, leg, and thigh using standard anthropometric data to set each segment's length, mass, and moment of inertia from the subject's body weight. For each frame, the script tracks segment angles and center-of-mass positions from the marker data, numerically differentiates to get linear and angular velocities and accelerations, then works up the chain from foot to hip applying Newton-Euler equations at each joint. The output is a plot of joint moments versus time along with x and y intersegmental forces at the ankle, knee, and hip, which together describe the internal loading the body produces during the recorded motion.

The biggest challenge was that numerical differentiation amplifies noise dramatically, so the raw marker data couldn't be differentiated twice without producing wild accelerations. I handled this by applying a moving-average filter to the raw marker positions and then again after each derivative step, which kept the velocity and acceleration signals in a workable state. I also wrote two helper functions for central difference differentiation, one for paired x and y signals and one for single angular signals, which kept the main script readable and made the velocity and acceleration calculations consistent across all three segments. The other tricky part was getting the moment equations right at each joint, since the sign of the moment arm depends on which direction the segment's unit vector points and which end of the segment the force is applied at. To build confidence in the results, I chained the analysis from the ground up, using each joint's solved reaction force as the input to the next segment so that any error would show up clearly in the following plots.

---

### Spinal Loading Model *(Featured)*
**Tags:** MATLAB, Biomechanics, Data Analysis, Gait Analysis
**Date:** May 2026

**Description:**
This project models a person lifting a 5 kg object and estimates the forces on their lower back across a range of postures, from a deep squat up to a nearly standing position. I was primarily responsible for building a 2D sagittal-plane model of the body as a six-link chain (foot, leg, thigh, trunk, upper arm, and forearm) using standard anthropometric data to set each segment's length and mass from the person's height and weight. For each posture, the code solves an inverse kinematics problem to find joint angles that place the hands at a target position. Additionally, this project assumes that the person is in quasi-static equilibrium which allows us to solve for the spinal force much easier. The output is a series of stick-figure plots plus summary graphs of muscle, shear, and compression forces versus knee angle, which together show why lifting form matters so much.

The hardest part was that the inverse kinematics problem is underdetermined. There are six joint angles but only two position equations, so most mathematical solutions come out biomechanically impossible, and MATLAB's fslove doesn't accept joint limits to rule them out. My team's workaround was to pick two anatomically reasonable end postures and linearly interpolate between them to seed 20 different initial guesses, steering the solver toward realistic poses without enforcing hard constraints. For the statics, we used 4×4 homogeneous transformation matrices to chain the body together so each segment's position and center of mass fell out of a single matrix multiplication, then built the equilibrium equations into a 3×3 linear system solved at every posture. To make sure the results held up, I added a sanity check on the hip-force decomposition into compression and shear, plus a base-of-support check on the body's center of mass to confirm each posture was actually stable.

---

### Disc Launcher *(Featured)*
**Tags:** CAD, Fabrication, Prototyping, Mechanical Design, Team Project
**Date:** Dec 2025

**Description:**
I worked with a team of five other student engineers to design and build a ballista-style launcher for a class project. My role focused on fabrication and performance testing, including building out the wooden frame and trigger mechanism and running the iteration cycles that pushed the launcher toward its final performance. The original goal was to launch a disc, but the disk was very light and flimsy, which meant that it was susceptible to very small changes in wind and would additionally deform substantially when shot from any powerful device. So the team and I made the call to embed the disc into a more aerodynamically stable dart-style projectile instead. That pivot ended up being the single biggest contributor to performance for the project and reframed how we approached the rest of the testing.

The trickiest piece was the trigger mechanism. We started with a medieval crossbow design as our reference, but translating that geometry into something that actually held up under our tension loads took several iterations. Early versions snapped under load, the string holder kept bending or slipping out of place, and getting the two contact pieces to mate cleanly enough for a consistent release was challenging. Each failure mode forced us to rethink either the material, the geometry, or the fit between the parts. Once the trigger finally released cleanly and predictably, our test data actually became relevant, since we could tell whether a distance change came from a design tweak or from a bad release. From there I ran iterative testing on dart geometry and launch angle, adjusting one variable at a time across multiple test sessions until we landed on a combination that pushed launch distance up by roughly 30% over our baseline.

---

### Object Avoiding Robot *(Other Noteworthy)*
**Tags:** Arduino, Robotics, Sensors
**Date:** Jan 2025

**Description:**
Programmed an Arduino to receive sonar distance and direction signals, translate them into avoidance regions, and navigate around obstacles autonomously. Refined the detection algorithm to improve smoothness and accuracy, resulting in a 25% increase in operating speed.

---

### Inverted Pendulum Table *(Other Noteworthy)*
**Tags:** MIG Welding, Fabrication, Plasma Cutting, Collaboration

**Description:**
Collaborated with another student and a faculty advisor to fabricate a rigid steel base for an inverted pendulum control system, where base stiffness directly affects the accuracy of the balancing control loop. Contributed to the geometric design of the structure and utilized MIG welding from scratch to join the assembly.

---

## Education

### University of Georgia College of Engineering
- **Degree:** Bachelor of Science in Mechanical Engineering
- **Certificate:** Certificate of Artificial Intelligence
- **GPA:** 3.51 / 4.0
- **Dates:** Aug 2023 — Dec 2027
- **Relevant Coursework:** Biomechanics, Thermodynamics, Fluid Mechanics, Strength of Materials, Circuits, Data Science 1
