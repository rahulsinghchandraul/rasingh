---
title: Visual Debugger
order: 1
image: /assets/images/lte_call_flow.jpg
layout: project_details
list-subtitle: Cisco, Aug 2013 to Dec 2014
list-summary:  Mapped inter-node communication through a network map using Cisco's monitor protocol.
img-width: 81.1
---

# Visual LTE Debugger

## LTE network debugging is hard

LTE consists of multiple internal network nodes, and they have significant network communication to perform internal tasks. Debugging all of these nodes together is hard, and it often involves manually going through Cisco's monitor protocol logs, which are significant for complex operations. Parallel calls add to the complexity and create an environment where bugs are often hotfixed instead of fixing at the source, due to the root cause being unknown.

*A sample LTE call flow*

![lte-call-flow](/assets/images/lte_call_flow.jpg)

## Looking at message flow diagrams is easier

The debugger parsed monpro logs and other node interfaces to draw a visual chart of the message flow. An interactive web page allows for detailed inspection of the messages being passed. Covering multiple protocols used for internal communication, and programmed in python, it was easily extensible to new protocols. Led to reduction of debugging times by 3x, and was instrumental in solving long-standing bugs.

