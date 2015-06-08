---
layout: docs
title: Apps Location
permalink: /docs/use/apps_location/
---

BRJS apps may reside in either the `apps` directory, which is located in parallel to the `sdk` directory, or in a user-created `apps` directory. BRJS uses the working directory from which a command is called in order to establish which the valid directory for your applications is. This means that you may run any BRJS command from anywhere within your application in order to recognize its containing folder as the valid `apps` folder or from the BRJS-defined `apps` folder, which is located parallel to the `sdk` folder. If the command is called from neither of these locations, the `apps` directory will be your current working directory.
