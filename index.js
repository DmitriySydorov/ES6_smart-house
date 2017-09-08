/**
 * Created by SD on 24.08.2017.
 */
'use strict';

class Device {
	constructor(name, mark,state) {
		this._name = name;
		this._mark = mark;
		this._state=false;
	}
	turnOn(){
		this._state = true;
	}
	turnOff(){
		this._state = false;
	}
	toString(){
		let state = this._state? 'turn on':'turn off';
		return "Device " + this._name + ',mark ' + this._mark + ' ' + state;
	}
}


class Channel {
	constructor(ch, maxCH) {   // переключение каналов
		this.ch = ch;
		this.maxCH = maxCH;
	}

	nextCH() {    //следующий канал
		if (this.ch < this.maxCH) {
			 this.ch++;
		}
		else{
			this.ch = 0;
		}
	}

	prevCH() {     //предыдущий канал
		if (this.ch > 0) {
			this.ch--;
		}
		else {
			 this.ch = this.maxCH;
		}
	}
}



class Range {
	constructor(range,minRange,maxRange,step){
	this.range=range;                          //значение по умолчанию диапазона
	this._maxRange=maxRange;                     //максимальное значение диапазона
	this._minRange=minRange;                     //минимальное значение диапазона
	this._step=step;
	}                            //шаг значенний диапазона

	next() {          //увеличиваем диапазон
		if(this.range < this._maxRange){
			this.range += this._step;}
	};
	prev() {          //уменьшаем диапазон
		if(this.range > this._minRange){
			this.range -= this._step;}
	};
}


class Tv extends Device{
	constructor(name,mark,channel,bright,volume){
		super(name, mark);
		this.channel=channel;
		this.bright=bright;
		this.volume=volume;
	}
	nextChannel(){
		this.channel.nextCH();
	};
	prevChannel(){
		this.channel.prevCH();
	};
	nextBright() {
		this.bright.next();
	};
	prevBright() {
		this.bright.prev();
	}
	nextVolume() {
		this.volume.next();
	};
	prevVolume() {
		this.volume.prev();
	};
}
class WasherMachine extends Device{
	constructor(name,mark,tempWater,time,pressing){
		super (name, mark);
		this.tempWater=tempWater;
		this.time=time;
		this.pressing=pressing;
	}
	nextTemp() {
		this.tempWater.next();
	};
	prevTemp() {
		this.tempWater.prev();
	};
	start() {             //пуск машины  и условие нужен ли отжим?
		let machine=document.getElementById('WasherMachine');
		if(this.pressing == true){
			machine.innerHTML = "<strong>WasherMachine start...</strong>";
			setTimeout(function () {
				machine.innerHTML = "<strong> WasherMachine stop!!!</strong>";
			},this.time+5000);
		}
		else {
			machine.innerHTML = "<strong>WasherMachine start...</strong>";
			setTimeout(function () {
				machine.innerHTML = "<strong> WasherMachine stop!!!</strong>";
			},this.time);
		}
	};
}


class ShowerCabine extends Device{
	constructor(name, mark, tempWater, light,mode){
		super(name,mark);
		this.tempWater=tempWater;                                  //температура воды
		this.light=light;                                          //яркость света в кабине
		this.mode=mode;
	}
	nextTemp() {
		this.tempWater.next();
	};
	prevTemp() {
		this.tempWater.prev();
	};
	nextLight() {
		this.light.next();
	};
	prevLight() {
		this.light.prev();
	};
	cabineMode() {           //варианты режимов кабины
		let cabine=document.getElementById('cabine');
		switch (this.mode){

			case 'shower':cabine.innerHTML ='mode = '+this.mode;break;
			case 'jacuzzi':cabine.innerHTML ='mode = '+this.mode;break;
			case 'massage':cabine.innerHTML ='mode = '+this.mode;break;
			default:
				cabine.innerHTML ( 'In the shower there are only such modes:shower,jacuzzi,massage' );
		}
	}
}



let tv1 = new Tv('TV','lg',new Channel(74,75),new Range(100,0,100,1),new Range(15,0,30,2));
console.dir(tv1);
tv1.nextChannel();
tv1.nextChannel();
tv1.nextChannel();
tv1.prevChannel();
tv1.nextVolume();
tv1.nextVolume();
tv1.nextVolume();
tv1.nextBright();
tv1.prevBright();
tv1.prevBright();
tv1.prevBright();
tv1.nextBright();

let washer= new WasherMachine('Washer','bosh',new Range(20,20,90,10),3000,false);
washer.nextTemp();
washer.nextTemp();
washer.nextTemp();
washer.prevTemp();
washer.start();
washer.turnOn();
console.log(washer.toString());
console.dir(washer);

let cabine = new ShowerCabine('Shower','ecosys',new Range(20,20,90,10),new Range(50,0,100,10),'jacuzzi');
cabine.cabineMode();
cabine.nextTemp();
cabine.nextLight();
console.dir(cabine);
