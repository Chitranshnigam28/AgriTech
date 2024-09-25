const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Load the data from the data.json file
const dataPath = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

app.use(express.json());


// Function to get crop recommendation
function getCropRecommendation(state, temperature, humidity, rainfall, soilType, previousCrop) {
    const crops = data.crops; //  `data.crops` contains the array of crops
    let recommendedCrop = null;
    let maxScore = -Infinity;

    // Helper function to calculate score for a crop
    const calculateScore = (crop) => {
        let score = 0;

        // Check ideal conditions
        const { temperature_range, humidity: idealHumidity, rainfall: idealRainfall, soil_type } = crop.ideal_conditions;
        const [tempMin, tempMax] = temperature_range.replace('°C', '').split('-').map(Number);
        const [humidityMin, humidityMax] = idealHumidity.replace('%', '').split('-').map(Number);
        const [rainfallMin, rainfallMax] = idealRainfall.replace('mm', '').split('-').map(Number);

        if (temperature >= tempMin && temperature <= tempMax) score += 1;
        if (humidity >= humidityMin && humidity <= humidityMax) score += 1;
        if (rainfall >= rainfallMin && rainfall <= rainfallMax) score += 1;
        if (soilType === soil_type) score += 1;

        // Consider soil quality
        const { pH, nutrient_content } = crop.soil_quality;
        const [soilPHMin, soilPHMax] = pH.split('-').map(Number);

        if (soilType && (soilType === crop.ideal_conditions.soil_type)) score += 1;

        // Check if soil pH and nutrient content match
        const soilPH = Number(soilType.pH); // Assuming soilType has a pH property
        if (soilPH >= soilPHMin && soilPH <= soilPHMax) score += 1;

        // Check nutrient content
        const nutrients = crop.soil_quality.nutrient_content;
        if (nutrients.nitrogen === 'high') score += 1;
        if (nutrients.phosphorus === 'high') score += 1;
        if (nutrients.potassium === 'high') score += 1;

        // Consider previous crop impact if available
        if (previousCrop) {
            const previousCropData = crops.find(crop => crop.name === previousCrop);
            if (previousCropData) {
                const { soil_impact } = previousCropData;
                const recommendedNextCrops = soil_impact.recommended_next_crop;
                if (recommendedNextCrops.includes(crop.name)) score += 2; // Increase score if crop is recommended for soil recovery
            }
        }

        return score;
    };

    // Iterate through crops and calculate scores
    for (const crop of crops) {
        const score = calculateScore(crop);

        if (score > maxScore) {
            maxScore = score;
            recommendedCrop = crop;
        }
    }

    // Return the result
    if (recommendedCrop) {
        return { recommendedCrop };
    } else {
        return { message: 'No suitable crop found based on the provided data.' };
    }
}

app.post('/recommendCrop', (req, res) => {
    try {
        const { state, temperature, humidity, rainfall, soilType, previousCrop } = req.body;

        // Parse numeric values to numbers
        const temp = Number(temperature);
        const humid = Number(humidity);
        const rain = Number(rainfall);

        if (!state || !temp || !humid || !rain || !soilType) {
            return res.status(400).json({ message: 'Missing required data' });
        }

        const { recommendedCrop } = getCropRecommendation(state, temp, humid, rain, soilType, previousCrop);

        if (recommendedCrop) {
            res.json({
                message: `Recommended crop for ${state} is ${recommendedCrop.name}`,
                crop: recommendedCrop
            });
        } else {
            res.status(404).json({ message: 'No crop recommendation found for the provided data.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Internal Server Error: ${err.message}` });
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
