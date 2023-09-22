async function checkReproduction({ creatureId, xPos, yPos, pregnancyTimer }) {
  if (pregnancyTimer > 0) return;
  const isMarked = await checkIsMarked({ xPos, yPos });

  if (isMarked) {
    const markerId = await getMarkerId({ xPos, yPos });
    await createChild({ creatureId, markerId });
    await setPregnancyTimer(creatureId, 10);
    await setPregnancyTimer(markerId, 10);
    await setIsNotMarked({ xPos, yPos });
  } else {
    await setIsMarked({ creatureId, xPos, yPos });
  }
}

async function createChild({ creatureId, markerId }) {
  const gridSize = await getGridSize();
  const child = new Creature({
    parrent: [creatureId, markerId],
    gridMin: gridSize.min,
    gridMax: gridSize.max,
  });
  await addCreatureToList(child);
}
