///<reference path="./../reference.d.ts"/>
///<amd-dependency path="jquery"/>
///<amd-dependency path="nprogress"/>

declare var NProgress: any;

export module util{
    export class Progress{
        static cfg: boolean = false;

        public static start(){
            NProgress.start();
            if(!util.Progress.cfg){
                NProgress.configure({minimum: 0.1});
                // NProgress.configure({
                //     template: "<div class='bar' role='bar'></div>"
                // });
            }
            util.Progress.cfg = true;
        }

        public static set(percent: number){
            NProgress.set(percent);
        }

        public static done(){
            NProgress.done();
        }
    }
}