# Data Needed

## Hero
destination

## Location Info
destination
other

## Holidays
destination
accomodation (region, rating, tripadrating, tripadreviews pricepp)

## Destinations
destination
regions (pricepp)
other

## Customer Reviews
trustp

## Order of queries and data dependencies

1. destination
2. destination hero image? [1]
3. location info data [1]
4. holidays data [1]
4.5. holidays images [4]
5. destinations data [1, 4] (no query needed?)
5.5? destination images (if not using holiday images)
6. customer reviews data