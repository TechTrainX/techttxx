import { HardwareProject } from '../types';

/**
 * ==============================================================================
 * TECHTRAINX — HARDWARE & EMBEDDED PROJECT SUPPORT
 * Practical project development support and complete kits for Arduino, Raspberry Pi, ESP32,
 * IoT, robotics, automation, and smart agriculture projects.
 * ==============================================================================
 */

export const HARDWARE_CATEGORIES: string[] = [
  'All Projects',
  'Arduino Uno Projects',
  'ESP32 IoT Projects',
  'Raspberry Pi Projects',
  'Robotics & RC',
  'Home Automation',
  'Agriculture & Environment'
];

export const HARDWARE_ASSISTANCE_NOTE =
  'TechTrainX provides project development assistance and, for selected builds, a complete component kit with setup guidance for Arduino, Raspberry Pi, ESP32, robotics, IoT, automation, and sensor-based projects. Kit contents, software, delivery mode, and support level should be confirmed before enrolment.';

export const HARDWARE_PROJECTS_DATA: HardwareProject[] = [
  {
    id: 'hw-001',
    slug: 'smart-irrigation-system',
    title: 'Automated Precision Irrigation & Soil Telemetry System',
    category: 'Agriculture & Environment',
    shortDescription: 'Soil-moisture sensing, relay-based pump control, and LCD display practice using Arduino Uno.',
    fullDescription: 'A guided agriculture and IoT project in which students read a capacitive soil sensor, control a small pump through a relay, and display readings on an I2C LCD. The project also covers manual control, threshold logic, and basic safety timeouts.',
    tagline: 'Practical Irrigation and IoT Learning',
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=85',
    circuitDiagramUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85',
    circuitSummary: 'Capacitive Soil Sensor (Analog OUT) → A0 ADC. 5V Relay IN → D7 GPIO. 16x2 LCD I2C Module → SDA (A4) / SCL (A5). Dual-rail power: 5V logic via onboard regulator, 12V 2A external DC barrel for inductive pump loads.',
    pinoutTable: [
      { pin: 'A0', componentPin: 'Soil Moisture Sensor OUT', description: 'Analog moisture reading (0–1023 ADC resolution)' },
      { pin: 'D7', componentPin: 'Relay Module IN1', description: 'Digital High signal triggers relay coil & pump drive' },
      { pin: 'A4 (SDA)', componentPin: 'LCD 16x2 I2C SDA', description: 'Bidirectional Serial Data line for telemetry display' },
      { pin: 'A5 (SCL)', componentPin: 'LCD 16x2 I2C SCL', description: 'Serial Clock line for synchronous I2C transmission' },
      { pin: '5V Rail', componentPin: 'VCC Bus', description: 'Regulated 5V rail for capacitive sensor & relay logic' },
      { pin: 'GND Rail', componentPin: 'Common Ground', description: 'Unified star-ground return bus for analog/digital signals' }
    ],
    microcontroller: 'Arduino Uno R3',
    badge: 'Agritech IoT',
    level: 'Beginner',
    hardwareComponents: [
      'Arduino Uno R3 (Atmega328P DIP)',
      'Corrosion-Resistant Capacitive Soil Moisture Sensor v1.2',
      'Optocoupler-Isolated 5V Relay Module (10A 250VAC)',
      '12V High-Torque Submersible Mini DC Pump',
      '16x2 Character LCD with PCF8574 I2C Backpack',
      'Heavy-Duty Silicone Fluid Conduit Tubing',
      '830-Point Solderless Breadboard & Male-Male Jumpers',
      '12V 2A Regulated DC Power Adapter with Barrel Jack'
    ],
    embeddedConcepts: ['Analog-to-Digital Conversion (ADC)', 'Optoisolated Relay Driving', 'I2C Master-Slave Protocol', 'Hysteresis Threshold Logic'],
    targetBranch: ['ECE', 'EEE', 'Agriculture Engineering', 'Mechatronics', 'IoT'],
    deliverablesIncluded: [
      'Complete component kit for the listed project, subject to availability',
      'CAD / Fritzing Circuit Schematics (Vector PDF & Gerber Files)',
      'Clean Embedded C++ Source Code with Detailed In-Line Documentation',
      'Project report format, presentation guidance, and documentation support',
      'Viva Voce Defense Question Bank with Technical Solutions',
      'Mentor-led project support & Calibration Session'
    ],
    assistanceOverview: 'Lead hardware engineer guides you step-by-step through breadboard wiring, sensor calibration curves, noise filtering algorithms, and live viva presentation preparation.'
  },
  {
    id: 'hw-002',
    slug: 'bluetooth-rc-car',
    title: 'Autonomous & Bluetooth Dual-Mode Robotics Rover',
    category: 'Robotics & RC',
    shortDescription: 'High-torque 4WD chassis with L298N H-Bridge dual motor driver, HC-05 Bluetooth UART, and Android telemetry.',
    fullDescription: 'A versatile robotics platform featuring a dual-layer laser-cut acrylic chassis and four geared DC motors. The onboard Arduino Uno decodes byte streams from an HC-05 Bluetooth transceiver linked to an Android telemetry controller. Includes dual PWM channels for fine-grained differential steering, high-speed turning, and instant electronic braking.',
    tagline: 'High-Torque Mobile Robotics & Embedded Telemetry',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=85',
    circuitDiagramUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=85',
    circuitSummary: 'HC-05 TX/RX → D0(RX)/D1(TX) via voltage divider. L298N Inputs IN1–IN4 → D5, D6, D9, D10. PWM Enable pins ENA/ENB → D3, D11. Dual 18650 Li-Ion cells (7.4V–8.4V) routed directly to L298N VMS terminal.',
    pinoutTable: [
      { pin: 'D0 (RX)', componentPin: 'HC-05 Bluetooth TX', description: 'UART serial data ingress from smartphone app' },
      { pin: 'D1 (TX)', componentPin: 'HC-05 Bluetooth RX', description: 'UART serial telemetry & status feedback return' },
      { pin: 'D5 (PWM)', componentPin: 'L298N IN1', description: 'Left channel forward direction logic' },
      { pin: 'D6 (PWM)', componentPin: 'L298N IN2', description: 'Left channel reverse direction logic' },
      { pin: 'D9 (PWM)', componentPin: 'L298N IN3', description: 'Right channel forward direction logic' },
      { pin: 'D10 (PWM)', componentPin: 'L298N IN4', description: 'Right channel reverse direction logic' },
      { pin: 'D3 / D11', componentPin: 'L298N ENA / ENB', description: 'Hardware 8-bit timer PWM duty-cycle speed control' },
      { pin: 'GND', componentPin: 'Common Star Ground', description: 'Battery negative and MCU digital ground reference' }
    ],
    microcontroller: 'Arduino Uno R3',
    badge: 'Mobile Robotics',
    level: 'Beginner',
    hardwareComponents: [
      'Arduino Uno R3 Controller Module',
      'HC-05 Industrial Bluetooth v2.0+EDR Module',
      'L298N Dual Full-Bridge Motor Driver Module with Heatsink',
      '4x High-Torque TT Geared DC Motors (1:48 Gearbox) + Grippy Rubber Tires',
      'Dual-Layer CNC Acrylic Robotic Chassis Kit',
      'Dual 18650 High-Drain Li-Ion Battery Pack with BMS Protection',
      'Fast Dual-Slot Li-Ion Smart Wall Charger',
      'Full Brass Standoffs, Machine Screws, and Cable Tie Kit'
    ],
    embeddedConcepts: ['UART Serial Protocols', 'H-Bridge Transistor Topologies', 'PWM Speed Modulation', 'State-Machine Firmware Design'],
    targetBranch: ['ECE', 'EEE', 'Mechatronics', 'Robotics', 'CSE'],
    deliverablesIncluded: [
      'Complete robotic component kit for the listed project, subject to availability',
      'Custom Android Controller Application (.APK & Source)',
      'Modular C++ Arduino Firmware with Packet Parsing Engine',
      'Full Wiring Blueprint & Schematic PDF',
      'Project documentation and presentation guidance',
      'Live Video Debugging & Motor Trimming Mentorship'
    ],
    assistanceOverview: 'Mentor assists with chassis alignment, Bluetooth baud rate pairing, H-bridge PWM motor trimming, and smartphone telemetry app setup.'
  },
  {
    id: 'hw-003',
    slug: 'esp32-home-automation',
    title: 'Cloud-Connected Smart Home Automation & Energy Node',
    category: 'Home Automation',
    shortDescription: 'ESP32-S3 Dual-Core SoC hosting async WebSockets, MQTT broker bridge, and 4-channel AC appliance relay isolation.',
    fullDescription: 'A guided ESP32 home-automation project covering Wi-Fi connectivity, a simple local web interface, sensor readings, relay control, and MQTT concepts. Mains-voltage work must be carried out only with appropriate supervision and safety precautions.',
    tagline: 'ESP32 Home Automation and IoT',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=85',
    circuitDiagramUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85',
    circuitSummary: 'ESP32 GPIO 4, 5, 18, 19 → 4-Channel Optocoupled Relay Board. Onboard DHT22 Temp/Humidity → GPIO 23 with 4.7k pull-up. Local manual tactile buttons → GPIO 13, 12, 14, 27 with hardware debounce RC filters.',
    pinoutTable: [
      { pin: 'GPIO 4', componentPin: 'Relay 1 Opto-IN', description: 'Appliance 1 control (Lighting circuit load)' },
      { pin: 'GPIO 5', componentPin: 'Relay 2 Opto-IN', description: 'Appliance 2 control (Inductive fan load)' },
      { pin: 'GPIO 18', componentPin: 'Relay 3 Opto-IN', description: 'Appliance 3 control (HVAC / socket switch)' },
      { pin: 'GPIO 19', componentPin: 'Relay 4 Opto-IN', description: 'Appliance 4 control (Auxiliary power channel)' },
      { pin: 'GPIO 23', componentPin: 'DHT22 Data Line', description: 'Single-wire high-precision thermal & humidity sensor' },
      { pin: 'GPIO 21 / 22', componentPin: 'I2C OLED Display', description: 'Real-time IP address and connection status screen' }
    ],
    microcontroller: 'ESP32-WROOM-32D',
    badge: 'Enterprise IoT',
    level: 'Intermediate',
    hardwareComponents: [
      'ESP32-WROOM-32D 38-Pin Development Board (240MHz Dual-Core)',
      '4-Channel 5V Relay Module with Optocoupler Isolation & Snubbers',
      'DHT22 High-Precision Digital Temperature & Relative Humidity Sensor',
      '0.96-inch High-Contrast I2C OLED Display Module (128x64 pixels)',
      '4x Surface Mount Tactile Switch Inputs for Manual Local Overrides',
      'Hi-Link HLK-PM01 AC-DC Step-Down Isolated Power Supply Module (230V to 5V)',
      'Flame-Retardant ABS Electrical Enclosure Box'
    ],
    embeddedConcepts: ['FreeRTOS Multi-Threading', 'Async WebSockets Server', 'MQTT Pub/Sub Telemetry', 'Galvanic Optoisolation Safety'],
    targetBranch: ['CSE', 'ECE', 'IT', 'Electrical Engineering'],
    deliverablesIncluded: [
      'Component kit with the listed safety parts, subject to availability',
      'C++ Firmware with AsyncTCP, WebSockets & Captive WiFi Portal',
      'Responsive Web Application & Android Companion App',
      'Full Wiring Schematic with AC Safety Clearances',
      'IEEE Format Project Report & Architecture Slides',
      'Mentor-led project support for Cloud Server Deployment & Alexa Skill Integration'
    ],
    assistanceOverview: 'Learn enterprise embedded practices: non-blocking FreeRTOS tasks, Wi-Fi reconnection watchdogs, safe AC snubber wiring, and secure MQTT cloud broker setup.'
  },
  {
    id: 'hw-004',
    slug: 'rfid-attendance-system',
    title: 'Biometric & Contactless RFID Smart Attendance Suite',
    category: 'Arduino Uno Projects',
    shortDescription: '13.56MHz RC522 RFID reader, DS3231 temperature-compensated RTC, and SD card transaction logger.',
    fullDescription: 'A guided RFID attendance project that reads card IDs, records entries on an SD card with date and time, and shows basic status feedback on an LCD. Students practise SPI, I2C, file storage, and simple data handling.',
    tagline: 'RFID Attendance and Data Logging',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=85',
    circuitDiagramUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85',
    circuitSummary: 'RC522 RFID Module → Hardware SPI Bus (SCK: D13, MISO: D12, MOSI: D11, SDA/CS: D10, RST: D9). MicroSD Module → Hardware SPI (CS: D4). DS3231 RTC → I2C Bus (A4/A5). Active Piezo Buzzer → D8.',
    pinoutTable: [
      { pin: 'D10 (SS)', componentPin: 'RC522 RFID SDA (CS)', description: 'Dedicated SPI Chip Select line for RFID transceiver' },
      { pin: 'D13 (SCK)', componentPin: 'Shared SPI Clock', description: 'Synchronous high-speed master clock (up to 4MHz)' },
      { pin: 'D11 (MOSI)', componentPin: 'Shared SPI MOSI', description: 'Master-Out Slave-In serial data bus' },
      { pin: 'D12 (MISO)', componentPin: 'Shared SPI MISO', description: 'Master-In Slave-Out serial data return' },
      { pin: 'D4', componentPin: 'MicroSD Card CS', description: 'Independent SPI Chip Select for storage module' },
      { pin: 'A4 / A5', componentPin: 'DS3231 RTC & LCD I2C', description: 'Hardware I2C clock and data bus for real-time clock' },
      { pin: 'D8', componentPin: 'Piezo Buzzer Pin', description: 'Audible feedback pulse for authorized/denied scans' }
    ],
    microcontroller: 'Arduino Uno R3',
    badge: 'Security Hardware',
    level: 'Intermediate',
    hardwareComponents: [
      'Arduino Uno R3 Development Board',
      'MFRC522 13.56MHz RFID Reader/Writer Module + 5x Smart Cards & Keyfobs',
      'DS3231 High-Precision Real-Time Clock (RTC) with Coin Battery',
      'Industrial Micro-SD Card Adapter Module + SanDisk 16GB Card',
      '16x2 Blue Backlight LCD with I2C Module',
      '5V Active Piezo Buzzer & Dual-Color Status LEDs (Red/Green)',
      'Acrylic Mounting Station with Pre-Drilled Screw Stand-Offs'
    ],
    embeddedConcepts: ['SPI Multi-Slave Bus Sharing', 'I2C Real-Time Clock Hardware', 'FAT32 SD File System Management', 'UID Cryptographic Parsing'],
    targetBranch: ['CSE', 'ECE', 'Information Technology', 'Instrumentation'],
    deliverablesIncluded: [
      'Complete RFID & Real-Time Logger Hardware Kit',
      'Clean C++ Firmware with Automated SD Logging & CSV Export',
      'Python Desktop GUI Application for Excel Attendance Export',
      'Detailed Hardware Pinout Blueprint & Circuit Schematic',
      'Comprehensive Project Report (IEEE Format)',
      'Mentor-led project support on Serial Protocols and Database Synchronization'
    ],
    assistanceOverview: 'Comprehensive coaching on SPI bus arbitration, SD card FAT32 buffer management, and integrating desktop Python dashboards to synchronize attendance into MySQL databases.'
  },
  {
    id: 'hw-005',
    slug: 'line-following-robot',
    title: 'Autonomous PID Line-Tracking & Maze Navigation Rover',
    category: 'Robotics & RC',
    shortDescription: '5-Channel analog IR sensor array, dual closed-loop PID control algorithm, and high-RPM metal gear motors.',
    fullDescription: 'A guided robotics project using an IR sensor array, motor driver, and PID control. Students learn how the rover detects a line, adjusts motor speed, and improves tracking through testing and tuning.',
    tagline: 'Line Tracking and PID Practice',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=85',
    circuitDiagramUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=85',
    circuitSummary: '5-Channel IR Reflectance Array → Analog ADC Pins A0, A1, A2, A3, A4. L298N Dual Motor Driver Inputs → D5, D6, D9, D10 with PWM speed throttling. High-discharge 7.4V Li-Po battery supplying motor driver VMS rail.',
    pinoutTable: [
      { pin: 'A0', componentPin: 'IR Sensor 1 (Far Left)', description: 'Analog path boundary edge detection' },
      { pin: 'A1', componentPin: 'IR Sensor 2 (Inner Left)', description: 'Fine line deviation detection' },
      { pin: 'A2', componentPin: 'IR Sensor 3 (Center Axis)', description: 'Center alignment zero-error baseline' },
      { pin: 'A3', componentPin: 'IR Sensor 4 (Inner Right)', description: 'Fine right deviation detection' },
      { pin: 'A4', componentPin: 'IR Sensor 5 (Far Right)', description: 'Sharp 90-degree turn detection' },
      { pin: 'D5 / D6', componentPin: 'L298N Left Motor PWM', description: 'Left motor directional PWM speed drive' },
      { pin: 'D9 / D10', componentPin: 'L298N Right Motor PWM', description: 'Right motor directional PWM speed drive' }
    ],
    microcontroller: 'Arduino Uno R3',
    badge: 'Robotics Competition',
    level: 'Intermediate',
    hardwareComponents: [
      'Arduino Uno R3 Microcontroller Module',
      '5-Channel Analog TCRT5000 IR Reflective Sensor Array with Potentiometer Trimmers',
      'L298N High-Efficiency Dual H-Bridge Motor Driver Module',
      '2x High-RPM N20 Metal Gearmotors with Custom Aluminum Brackets',
      'Aerodynamic Lightweight Laser-Cut Aluminum Chassis Plate',
      'Low-Friction Omni-Directional Steel Ball Caster Wheel',
      '7.4V 1500mAh 25C High-Discharge Li-Po Battery Pack + Safe Balance Charger'
    ],
    embeddedConcepts: ['Discrete PID Control Loops', 'Analog Centroid Weighting Algorithms', 'Fast Hardware PWM Output', 'Dynamic Friction Compensation'],
    targetBranch: ['Robotics', 'Mechatronics', 'ECE', 'EEE', 'Mechanical Engineering'],
    deliverablesIncluded: [
      'Robotics component kit with required parts, subject to availability',
      'Modular Embedded C++ Firmware with Real-Time PID Tuning Math',
      'Complete Circuit Diagram, Pinout Matrix & PCB Design',
      'Project report and presentation guidance',
      'Competition Strategy Guide & Grid Testing Roadmap',
      'Mentor-led project support on Kp, Ki, Kd Parameter Optimization'
    ],
    assistanceOverview: 'Hands-on training tuning Kp, Ki, and Kd coefficients on test tracks, eliminating sensor noise via moving average filters, and optimizing battery discharge curves for peak acceleration.'
  },
  {
    id: 'hw-006',
    slug: 'air-quality-monitoring-esp32',
    title: 'ESP32 Air Quality Monitoring Project',
    category: 'Agriculture & Environment',
    shortDescription: 'Plantower PMS5003 laser particulate sensor, MQ-135 chemical sensor, and MQTT dashboard analytics on ESP32.',
    fullDescription: 'A continuous atmospheric monitoring laboratory node. Couples a Plantower PMS5003 laser scattering optical sensor (measuring PM1.0, PM2.5, PM10 in micrograms/m³), an MQ-135 electrochemical gas sensor (detecting NH3, NOx, Alcohol, Benzene, and Smoke), and a calibrated DHT22 sensor. Streams encrypted environmental telemetry to an IoT dashboard such as ThingSpeak, where applicable.',
    tagline: 'Air Quality Sensing and IoT Data',
    imageUrl: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?auto=format&fit=crop&w=1000&q=85',
    circuitDiagramUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85',
    circuitSummary: 'Plantower PMS5003 Laser Sensor → Hardware UART2 (RX2: GPIO 16, TX2: GPIO 17). MQ-135 Analog Output → GPIO 34 (12-bit ADC). DHT22 Sensor → GPIO 4 with pull-up. 0.96-inch OLED → Hardware I2C (SDA: GPIO 21, SCL: GPIO 22).',
    pinoutTable: [
      { pin: 'GPIO 16 (RX2)', componentPin: 'PMS5003 Laser Sensor TX', description: 'UART serial binary packet stream containing PM1.0/2.5/10 data' },
      { pin: 'GPIO 17 (TX2)', componentPin: 'PMS5003 Laser Sensor RX', description: 'Command line for sensor sleep/wake modes' },
      { pin: 'GPIO 34 (ADC1)', componentPin: 'MQ-135 Gas Sensor AO', description: '12-bit analog voltage conversion for Air Quality Index (AQI)' },
      { pin: 'GPIO 4', componentPin: 'DHT22 Digital Output', description: 'Single-bus calibrated temperature & relative humidity data' },
      { pin: 'GPIO 21 (SDA)', componentPin: '0.96" OLED I2C SDA', description: 'Display frame buffer serial data' },
      { pin: 'GPIO 22 (SCL)', componentPin: '0.96" OLED I2C SCL', description: 'Display frame buffer serial clock' }
    ],
    microcontroller: 'ESP32-WROOM-32D',
    badge: 'Environmental IoT',
    level: 'Advanced',
    hardwareComponents: [
      'ESP32 Dual-Core 240MHz Development Module',
      'Plantower PMS5003 Laser Optical Particulate Matter Sensor + Cable',
      'MQ-135 Hazardous Gas & Air Quality Sensor with Analog Comparator',
      'DHT22 High-Precision Digital Environmental Sensor',
      '0.96-inch Crisp White OLED Display Module (128x64)',
      'Active Acoustic Piezo Alarm Buzzer + Warning LEDs',
      'Micro-USB High-Speed Data & Power Cable with 5V 2.4A Adapter'
    ],
    embeddedConcepts: ['Laser Optical Scattering Physics', 'UART Checksum Verification', 'Analog PPM Chemical Curve Math', 'Cloud MQTT & REST Telemetry'],
    targetBranch: ['ECE', 'CSE', 'Environmental Engineering', 'IoT', 'IT'],
    deliverablesIncluded: [
      'Complete sensor component kit for the listed project, subject to availability',
      'ESP32 Embedded C++ Firmware with Automated Sensor Checksum Validation',
      'Cloud Dashboard Configuration Files (ThingSpeak & Grafana)',
      'Vector Circuit Schematics & PCB Layout Diagram',
      'Project report and presentation guidance',
      'Mentor-led project support on Environmental Data Analysis and IoT Security'
    ],
    assistanceOverview: 'Coaching on laser scattering particulate packet decoding, polynomial curve fitting for MQ-135 gas PPM estimation, and setting up automated WhatsApp/Email alert webhooks.'
  }
];
