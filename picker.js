window.onload = function() {
    const randInt = (a, b) => {
        let low, high;

        if (b === undefined) {
            low = 0;
            high = a;
        } else {
            low = a;
            high = b;
        }

        const diff = high - low + 1;
        return Math.floor(Math.random() * diff) + low;
    };

    const randBool = () => {
        return Math.random() < 0.5;
    };

    const pick = (elems) => {
        if (elems.length < 1) {
            throw new Error(
                `pick() expects at least one element, got ${elems}`
            );
        }

        const index = randInt(elems.length - 1);
        return elems[index];
    };

    const pickTwo = (elems) => {
        if (elems.length < 2) {
            throw new Error(
                `pickTwo() expects at least two elements, got ${elems}`
            );
        }

        const len = elems.length;
        const max = len - 1;
        const first = randInt(max);
        const second = (first + randInt(1, max)) % len;

        return [elems[first], elems[second]];
    };

    const questions = [
        `What would you choose between staying in bed with the love of your life for the whole day and whatever you've been doing yesterday?`,
        `What do you really want? What if you want too little?`,
        `What are you waiting for?`,
        `What are you running from? What are you running towards?`,
        `What is the most horrible thing that didn't happen to you this week?`,
        `On a scale of 1 to 10, how embarrassed would you be to meet yourself when you were half your current age?`,
        `If you could be in any random place of your choosing, where'd you go? Also, why are you so dull to assume the present day?`,
        `What are you afraid of? What are you not afraid of?`,
        `Why don't you just forget about it and move on?`,
        `Why do you still care? What do you still care about?`,
        `Do you understand how it works?`,
        `What's your biggest regret, and why are you not doing anything about it?`,
        () => {
            const options = ['amazing', 'awesome', 'beautiful'];
            const option = pick(options);
            return `Do you know that you're ${option}`;
        },
        () => {
            const options = [
                'a raccoon', 'a badger', 'an owl', 'a wolf', 'a bear', 'a deer',
                'a giraffe', 'an elephant', 'a lion', 'a tiger', 'a sloth', 'a falcon'
            ];
            const [first, second] = pickTwo(options);
            return `Are you more of ${first} person or ${second} person?`;
        },
        () => {
            const banks = [
                ['forest', 'seashore', 'mountains', 'rivers'],
                ['rain', 'snow', 'sunshine', 'wind'],
                ['chocolate', 'pizza', 'sushi', 'paella'],
                ['oranges', 'apples', 'bananas', 'pears']
            ];
            let [first, second] = pickTwo(banks);
            first = pick(first);
            second = pick(second);
            return `What do you prefer, ${first} or ${second}?`;
        },
        () => {
            const options = [
                'an avocado', 'a spider', 'a hill', 'a penguin',
                'an industrial refrigerator', 'a washing machine',
                'a pine tree', 'a cloud'
            ];
            const option = pick(options);
            return `If you were ${option}, how would that affect your life?`;
        }
    ];

    let previous = '';

    const refresh = () => {
        let next = '';
        do {
            const q = pick(questions);
            if (typeof q === 'function') {
                next = q();
            } else {
                next = q;
            }
        } while (previous === next);

        document.getElementById('question').innerHTML = next;
        previous = next;
    };
        
    document.getElementById('refresh').onclick = (evt) => {
        evt.preventDefault();
        refresh();
    };
    refresh();
}

