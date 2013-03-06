
class ThreadPriority{
    public static REALTIME = 0;
    public static HIGH = 10;
    public static NORMAL = 100;
    public static LOW = 1000;
}

class Thread{
	private runnable : Runnable;
	private interval; 	
	private priority = ThreadPriority.NORMAL;
	
	constructor(runnable : Runnable){
		this.runnable = runnable;
	}
	
	public start(){
		this.interval = setInterval(() => { this.run(); }, this.priority);
		console.log("Thread start called " + this.interval);
	}
	
	public stop(){
		console.log("Thread stop called " + this.interval);
		clearInterval(this.interval);
	}
	
	public run(){
		console.log("Thread run called : " + this.interval);
		if(this.runnable.run() == 0) this.stop();
	}

	public setPriority(prio){
		this.priority = prio;
		if(this.interval){
			this.stop();
			this.start();
		}
	}
	
}

interface Runnable{
	run();
}

