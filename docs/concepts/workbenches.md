---
layout: docs
title: Workbenches
permalink: /docs/concepts/workbenches/
---

**Workbenches** are a core part of the BRJS development process, which may be used for bladesets or blades. 

## Blade Workbenches

They let you run, view and modify individual blades, so that you can develop and debug each component in isolation from the rest of your application.

![A Blade Workbench](/blog/img/workbench_v2.png)

<small class="fig-text">A Caplin Trader FX Tile <strong>Blade</strong> running within a Blade <strong>Workbench</strong></small>

## Bladeset Workbenches

This is a location to configure contained blades as required. For example, you may use a ServiceRegistry here to register a dummy service to facilitate the development of the blades contained within your bladeset. Furthermore, you may send messages between blades through a EventHub, which you may view in your EventHubViewer. A KnockoutComponent panel is also available, which will enable you to view the model corresponding to the specified blade.