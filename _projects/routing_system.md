---
title: Routing System
order: 2
image: /assets/images/20_min_isoline.png
layout: project_details
list-subtitle: Housing, Dec 2014 to Apr 2015
list-summary:  A realtime horizontally scalable isoline routing engine based on multi-transit data.
---

# Isoline Routing System

## Why isolines?

Isolines are geometrical shapes which indicate times to commute from a particular point on the map in a set amount of time. For the rent product, these isolines are a very important factor in decision because you are flexible about the area you stay in, but have constraints on your daily commute. Isolines plotted on a map help decide localities.

## Implementation

Isolines are a computationally intensive task, often requiring multiple polygon union statements to calculate. We preprocessed and cached isoline polygons to make the system realtime. To provide a feasible product, we provided fixed search query intervals and search from establishments.

A reasonably accurate representation including historical traffic data was provided via an approximation function which could provide an optimal average-case scenario from the point in question. Crawling in a grid over cities, we could precompute and cache the isolines for all establishments. After 4 months of development, including 2 weeks of crawling isolines, our system was ready for over 25 cities in India.

## Response

![20-min-isoline](/assets/images/20_min_isoline.png)
[*Viewable live here*](https://housing.com/rent/flats-for-rent-in-supreme-business-park-hiranandani-gardens-powai-mumbai-E6imtWaX1).

The time routing feature was incredibly successful, with it bringing forth a conversion rate from search to monetizable lead in 60% cases. On user feedback, we included a multi-locality function to find intersection localities from various establishments.

The feature was much needed for the rent product, and let to high user engagement and conversion. A success!
