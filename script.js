
const room =
    document.getElementById("room");

const pullWire =
    document.getElementById("pullWire");

const pullHandle =
    document.getElementById("pullHandle");

const door =
    document.getElementById("door");

const bear =
    document.getElementById("bear");

const bearArm =
    document.getElementById("bearArm");

const paw =
    document.getElementById("paw");

const instruction =
    document.getElementById("instruction");

const statusText =
    document.getElementById("status");
let dragging = false;

let startY = 0;

let pullAmount = 0;

let lightOn = false;

let animationRunning = false;
pullWire.addEventListener(
    "pointerdown",
    function(event) {

        if (
            lightOn ||
            animationRunning
        ) {
            return;
        }

        dragging = true;

        startY =
            event.clientY;

        pullWire.setPointerCapture(
            event.pointerId
        );

    }
);
pullWire.addEventListener(
    "pointermove",
    function(event) {

        if (
            !dragging ||
            lightOn ||
            animationRunning
        ) {
            return;
        }

        const distance =
            event.clientY - startY;


        if (distance > 0) {

            pullAmount =
                Math.min(
                    distance,
                    90
                );


            pullWire.style.transform =
                `translateY(${pullAmount}px)`;


            /* Light ON */

            if (
                pullAmount >= 65
            ) {

                turnLightOn();

            }

        }

    }
);

pullWire.addEventListener(
    "pointerup",
    function() {

        dragging = false;


        if (!lightOn) {

            pullAmount = 0;

            pullWire.style.transform =
                "translateY(0)";

        }

    }
);

pullWire.addEventListener(
    "pointercancel",
    function() {

        dragging = false;

        pullAmount = 0;

        pullWire.style.transform =
            "translateY(0)";

    }
);
function turnLightOn() {

    if (
        lightOn ||
        animationRunning
    ) {
        return;
    }


    animationRunning = true;

    lightOn = true;


    /* Light ON */

    room.classList.add(
        "light-on"
    );


    /* Reset wire */

    pullWire.style.transform =
        "translateY(0)";


    /* Hide instruction */

    instruction.style.opacity =
        "0";


    /* Open door */

    setTimeout(
        function() {

            door.classList.add(
                "open"
            );

        },
        800
    );


    /* Bear reaches */

    setTimeout(
        function() {

            bear.classList.add(
                "reach"
            );

        },
        1900
    );


    /* Bear grabs wire */

    setTimeout(
        function() {

            bear.classList.add(
                "holding"
            );

        },
        3100
    );


    /* Bear pulls wire */

    setTimeout(
        function() {

            bearPullsWire();

        },
        3500
    );

}
function bearPullsWire() {

    /* First pull */

    pullWire.style.transform =
        "translateY(35px)";

    pullHandle.style.transform =
        "translateX(-50%) translateY(35px)";


    /* Stronger pull */

    setTimeout(
        function() {

            pullWire.style.transform =
                "translateY(75px)";

            pullHandle.style.transform =
                "translateX(-50%) translateY(75px)";


            /* Turn bulb OFF */

            setTimeout(
                function() {

                    turnLightOff();

                },
                500
            );

        },
        450
    );

}


/* =====================================================
   TURN LIGHT OFF
===================================================== */

function turnLightOff() {

    /* Bulb OFF */

    room.classList.remove(
        "light-on"
    );


    /* Bear releases */

    setTimeout(
        function() {

            bear.classList.remove(
                "holding"
            );

        },
        300
    );


    /* Bear arm returns */

    setTimeout(
        function() {

            bear.classList.remove(
                "reach"
            );

        },
        500
    );


    /* Wire returns */

    setTimeout(
        function() {

            pullWire.style.transform =
                "translateY(0)";

            pullHandle.style.transform =
                "translateX(-50%)";

        },
        1000
    );


    /* Door closes */

    setTimeout(
        function() {

            door.classList.remove(
                "open"
            );

        },
        1400
    );


    /* Show status */

    setTimeout(
        function() {

            statusText.classList.add(
                "show"
            );

        },
        1700
    );


    /* Reset */

    setTimeout(
        function() {

            statusText.classList.remove(
                "show"
            );

            instruction.style.opacity =
                "1";

            lightOn = false;

            animationRunning = false;

            pullAmount = 0;

        },
        3500
    );

}