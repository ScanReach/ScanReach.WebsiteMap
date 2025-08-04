# ScanReach.WebsiteMap

This is a repo for a website map of partners of ScanReach and representatives working for ScanReach. It shows the areas that the partners and representatives each have and is based on what query parameter is entered.

## How the map works

Curently the default parameter is representatives. To show the sales partners instead, remove <sub>representatives</sub> from the end of the query and enter <sub>salespartners</sub> instead.

Click once on the map to activate it.

Hovering over, or clicking an area will show a popup with the sales partners logo and link to website, and a marker at the lat long where the partner offices is located.
When showing the representatives part of the map, hovering over, or clicking an area will show a popup with the representatives image, name and the default sales email and phone number. Clicking the email will open the default email on your device and enter scanreach´s default sales email into the to: area. Clicking the phone will give you an option on your device to call that number

A user can choose list instead, this is especially useful on screen sizes smaller then 768px. The list will show all partners or representatives and the area that is their responsibility.

## How to create new geoJson borders

- Open Overpass Turbo
- Use ChatGPT to create a query for the getting the needed borders
- Click RUN
- Verify that correct Borders are marked
- Click Export and copy GeoJson
- Create a file with the name of the country(ies) the border includes
- Install mapshaper `npm install -g mapshaper`
- Run this command `mapshaper borders/your-file.geojson -simplify 5% -o format=geojson borders/your-desired-filename-simplified.geojson`
- Verify the border by running the application with liveserver
- Add the partner or representative to the Js file
- For SalesPartners add lngLat for their HQ

## Screenshots of how the map and list looks dependant on what query is chosen

Salespartners map on desktop

![Screenshot of the map showing salespartners polygon, popup and marker on desktop](./salesPartnerMap_desktop.png)

Salespartners map on mobile

![Screenshot of the map showing salespartners polygon, popup and marker on mobile](./salesPartnerMap_mobile.png)

Salespartners list on desktop

![Screenshot of the list showing salespartners on desktop](./salesPartnerMap_desktop.png)

Salespartners list on mobile

![Screenshot of the list showing salespartners on mobile](./salesPartnerMap_mobile.png)

Representative map on desktop

![Screenshot of the map showing representative polygon highlighted and popup on desktop](./representativesMap_desktop.png)

Representative map on mobile

![Screenshot of the map showing representative polygon highlighted and popup on mobile](./representativesMap_mobile.png)

Representative list on desktop

![Screenshot of the list showing representatives on desktop](./representativesList_desktop.png)

Representative list on mobile

![Screenshot of the list showing representatives on mobile](./representativesList_mobile.png)

## Image from miro on the plan for the page

![Screenshot of the miro board for the plan for the page](miroBoard.png)

## Findings:

- [ ] Should the polygon go back to its default opacity when another area is clicked?
