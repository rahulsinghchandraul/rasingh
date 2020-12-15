---
title: Sample Based Distributional Policy Gradient
order: 2
image: /assets/images/sdpg.png
layout: project_details
list-subtitle: Georgia Tech, May 2019 to Present
list-summary:  Sample based distribution representation within DRL framework
paper-pdf-address: /assets/SDPG.pdf
---

# Abstract

Distributional reinforcement learning (DRL) is a recent reinforcement learning framework whose success has been supported by various empirical studies. It relies on the idea of replacing the expected return with the return distribution, which captures the intrinsic randomness of the long term rewards. Most of the existing literature on DRL focuses on problems with discrete action space and value based methods. In this work, motivated by applications in control engineering and robotics where the action space is continuous, we propose sample-based distributional policy gradient (SDPG) algorithm. It models the return distribution using samples via a reparameterization technique widely used in generative modeling. We compare SDPG with the state-of-art policy gradient method in DRL, distributed distributional deterministic policy gradients (D4PG). We apply SDPG and D4PG to multiple OpenAI Gym environments and observe that our algorithm shows better sample efficiency as well as higher reward for most tasks.

## Algorithm

Here

* a
* b
* c


## Demo

Insert video

## Paper

<object data="{{ page.paper-pdf-address }}" type="application/pdf" width="100%" height="1000px">
<iframe src="{{ page.paper-pdf-address }}" style="border: none;" width="100%" height="1000px">
This browser does not support PDFs. Please download the PDF to view it: <a href="{{ page.paper-pdf-address }}">Download PDF</a>
</iframe>
</object>
