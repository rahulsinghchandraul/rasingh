---
title: VR + Backend
order: 1
image: http://placehold.it/800x600/2ecc71/fff
layout: project_details
list-subtitle: Housing.com, Oct 2015 to Sep 2017
list-summary: An architectural VR experience made from scratch. Supported by a web build system using Three.js.
---

# VR & Backend Build System

## VR Experience

An architectural experience, the VR aimed for photorealism and interior space exploration as it’s primary offerings. These factors were empirically shown to be the most influential with buyers for shortlisting properties, and the experience was targeted as a precursor to actual site visits before purchases. To cover all aspects of the visit, three experience types were integrated into the application:
* To-scale 3D model exploration
* Multiple Panorama walkthrough
* 360 Videos
{: .negative-margin-top }

The primary headset we used was the Gear VR, because of its balance between mobility, performance, visual quality and comfort.

<p>
<div class='embed-container'>
<iframe title="YouTube video player" src="http://www.youtube.com/embed/CoDJlaAlR1Y?wmode=opaque" frameborder="0" allowfullscreen="allowfullscreen">t</iframe>
</div>
</p>

### 3D Model Exploration

Targeted at interior model exploration, the experience emulated walking through a scale model of the flat, fully furnished according to developer standards. An exact replica of the showcase sample flat often made by builders, the exploration allowed a user to experience the space constraints as if present, a major consideration for purchasing a flat.

Some of the features coded in the experience were multiple themes, actual window views, floor changes, sound narrations and screen mirroring. Combined together, these features provided a complete experience for the customer and salesman to engage in a fruitful exploration of the space.

<p>
<div class='embed-container'>
<iframe title="YouTube video player" src="http://www.youtube.com/embed/lZcjhcZx2Mo?wmode=opaque" frameborder="0" allowfullscreen="allowfullscreen">t</iframe>
</div>
</p>

### Panorama walkthrough

Targeted at exteriors and large open spaces which would be too tedious to explore through a walking-like interface. Navigated through a hotspot UI, this system allows for a big-picture view of the project and its surrounding space.

### 360 Videos

Mainly aimed at automating the process of showcasing the property, and as vanity projects for builders. This is the most restrictive of the above experiences, but it allows users to quickly peruse the features the builder wishes to showcase. Since this is pre-rendered, the visual quality is photo realistic, and allows for audio narration.

## Backend build system

Soon after completing the VR experience, we had issues where due to a small team size, it took us up to a month to complete a single VR build. We needed to productise this process and reduce the build time significantly. Identifying that most interior 3D models were made through a similar process, and that we could modularize the model creation, we created a build system operated through a web front end by an operator, who could design the house and send it for processing to Unity, which created and launched the experience as an app. The build time was cut down from multiple weeks to less than a day, allowing for much higher delivery potential and scalability. The system was divided into three parts:
1. Front end design panel to provide design parameters
2. Rails backend to add meta-data and connect to Unity
3. Unity build system for model creation and app generation
{: .negative-margin-top }

### Design panel

Developed in three.js, the front end design panel allowed operators to create houses from scratch. Tied into Housing’s database, floor plans and configuration details were directly provided. Armed with a floor plan and an interior furnishing sketch, an operator could create a detailed house in a matter of hours.

![frontend-panel](/assets/images/vr_frontend.png)

### Rails backend

The rails backend translated data, and connected the frontend to the Unity build system. Connected to Housing’s backend, the system automatically added builder metadata and organized the model data according to its categories. It also acted as a load balancer, managing Unity jobs over multiple build servers.

### Unity build system

The Unity build system was the monster supporting the entire build process. The system handled all the tasks of actually creating a 3D model according to specifications, furnishing it, lighting, baking and processing it into a final product. The build system performed the following steps procedurally:

- Creating the walls, floors and ceilings
- Cutting out windows, doors and balconies
- Adding appropriate furnishings from the library mapped from the frontend
- Adding lights depending on the size and structure of the room
- Adding reflection probes for realism
- Baking the lights and reflection probes
- Creating a menu for the available experiences with builder metadata
- Building the entire project as a single APK available for the Gear VR
{: .negative-margin-top }
