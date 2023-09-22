class creatureController {


   async act() {
        if(this.isAlive) {
            this.updateFertility();
            await this.updateDirection();
            this.move();
            await this.checkReproduction();
            this.checkDeath();
            population.update(creatureID);
        }

        return true;
    }

     updateFertility(){
        if (this.pregnancyTimer > 0){
            this.pregnancyTimer = this.pregnancyTimer - 1;
        }
    }

  async updateDirection() {
       if (this.xPos == canvas.maxX) {
           this.xPull = -1;
       }
       if (this.xPos == canvas.minX) {
           this.xPull = 1;
       }
       if (this.yPos == canvas.maxY) {
           this.yPull = -1;
       }
       if (this.yPos == canvas.minY) {
           this.yPull = 1;
       }

       this.xPull = (math.random()-0.5) * 0.25 * this.xPullChange + this.xPullChange + this.xPull;
       this.yPull = (math.random()-0.5) * 0.25 * this.yPullChange + this.yPullChange + this.yPull;

       if (this.xPull > 1) {
           this.xPull = 1;
       }
       if (this.xPull < -1) {
           this.xPull = -1;
       }
       if (this.yPull > 1) {
           this.yPull = 1;
       }
       if (this.yPull < -1) {
           this.yPull = -1;
       }
      return true;
   }

   move () {
       this.xPos = math.round(this.xPos + (this.speed * this.xPull));
       this.yPos = math.round(this.yPos + (this.speed * this.yPull));
   }

    async  checkReproduction({ creatureId, xPos, yPos, pregnancyTimer }) {
        if (pregnancyTimer > 0) return;
        const isMarked = await canvas.checkIsMarked({ xPos, yPos });

        if (isMarked) {
            const markerId = await canvas.getMarkerId({ xPos, yPos });
            await createChild({ creatureId, markerId });

            this.pregnancyTimer = 10;
            await population.setPregnancyTimer(markerId, 10);

            await setIsNotMarked({ xPos, yPos });
        } else {
            await setIsMarked({ creatureId, xPos, yPos });
        }
    }

    checkDeath() {
        if (math.random()*200 < this.age ){
            this.isAlive = false;
        }
    }

}