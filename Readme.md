# beGateway JavaScript library

The aim of the library to start accepting payments using iframe
integrated to a merchant site.

There are 3 simple steps required to setup the payment form at your
website.

## Step 1 - acquire a payment token

Refer to [beGateway API](https://doc.begateway.com/checkout/payment-token) or API of your payment service processor how to acquire a payment token.

Simply it can be done with cURL but you are free to use beGateway [PHP](https://github.com/beGateway/begateway-api-php) or [Ruby](https://github.com/beGateway/client_ruby) libraries.

```sh
curl https://checkout.begateway.com/ctp/api/checkouts \
  -u 361:b8647b68898b084b836474ed8d61ffe117c9a01168d867f24953b776ddcb134d \
  -H 'Content-type: application/json' \
  -d '
{
    "checkout": {
        "order": {
            "amount": 500,
            "currency": "EUR",
            "description": "Demo payment"
        },
        "settings": {
            "customer_fields": {
                "hidden": [
                    "address"
                ],
                "read_only": []
            },
            "language": "en",
            "decline_url": "http://www.example.com/decline",
            "fail_url": "http://www.example.com/fail",
            "notification_url": "http://www.example.com/notify",
            "success_url": "http://www.example.com/success"
        },
        "transaction_type": "payment"
    }
}
  '
```

beGateway resonds with JSON message like:

```json
{
    "checkout": {
        "redirect_url": "https://checkout.begateway.com/checkout?token=2dace3c57d96d64a0026364c7bd26c627e7a96d8fef8e129d45b2ebd2864db1c",
        "token": "2dace3c57d96d64a0026364c7bd26c627e7a96d8fef8e129d45b2ebd2864db1c"
    }
}
```

## Step 2 - build HTML

Now you will add the following JavaScript/HTML lines of code to your
page and populate the variables as follows:

  * `type` - iframe type: `inline` or `overlay`
  * `element id` - id of an element where to stick to show an inline
    iframe or bring up an overlay one when the element is clicked
  * `redirect url` - a value of the `redirect_url` variable in a JSON
    response from the step 1
  * `css` - CSS to pass to iframe. You can re-defind built-in CSS
    classes and design the payment form in own style
  * `width`, `height` - optional iframe geometry. By default 320px x
    480px

__Note:__ Upload
[paymentr.min.js](https://raw.githubusercontent.com/beGateway/begateway-js/master/paymentr.min.js) to your webserver.

```javascript
<script type="text/javascript" src="paymentr.min.js"></script>
<script type="text/javascript">
  var options = {
    type: '{type}',
    id: '{element id}',
    url: "{redirect_url}",
    style: "{css}",
    size: { width: {width}, height: {height} }
  }

  var pf = new PaymentForm(options);
  pf.buildForm();
</script>
```

### Overlay iframe

Now let's see it in action. Here is a HTML example where iframe is overlay:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Overlay iFrame payment form</title>
  <script type="text/javascript" src="paymentr.min.js"></script>
</head>
<body style="width: 70%; margin: 10px auto;">
  <h1>Test shop</h1>
  <p>
    T-Shirt 5 EUR
  </p>
  <a href="#" id="paymentLink">Buy it</a>

<script type="text/javascript">
  var options = {
    type: 'overlay',
    id: 'paymentLink',
    url: "https://checkout.begateway.com/checkout?token=2dace3c57d96d64a0026364c7bd26c627e7a96d8fef8e129d45b2ebd2864db1c",
    style: "",
    size: { width: 320, height: 480 }
  }

  var pf = new PaymentForm(options);
  pf.buildForm();
</script>

</body>
</html>
```

### Inlide iframe

Here is an example of inline iframe:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Inline iFrame payment form</title>
  <script type="text/javascript" src="paymentr.min.js"></script>
</head>
<body style="width: 70%; margin: 10px auto;">
  <h1>Test shop</h1>
  <p>
    T-Shirt 5 EUR
  </p>
  <div id="paymentForm"></div>

<script type="text/javascript">

  var options = {
    type: 'inline',
    id: 'paymentForm',
    url: "https://checkout.begateway.com/checkout?token=2dace3c57d96d64a0026364c7bd26c627e7a96d8fef8e129d45b2ebd2864db1c",
    style: "",
    size: { width: 350, height: 350 }
  }
  var pf = new PaymentForm(options);
  pf.buildForm();
</script>

</body>
</html>
```

## Step 3 - check payment status

When a payment is completed, beGateway redirects a customer to URLs as
follows:

  * `success_url` if the payment was successful
  * `decline_url` if the payment was declined
  * `fail_url` if an error occured during payment process

See [beGateway API](https://doc.begateway.com/checkout/customer-return) or API of your payment service processor to know more details.

Additionally [webhook](https://doc.begateway.com/webhooks) notification
is posted to `notification_url`
