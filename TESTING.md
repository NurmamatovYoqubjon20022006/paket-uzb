# 🧪 PAKET UZB - TESTING GUIDE

## API Testing Commands

### PowerShell'da Test Qilish

#### Products API
```powershell
# Barcha mahsulotlar
Invoke-RestMethod -Uri "http://localhost:3004/api/products" -Method GET

# Kategoriya bo'yicha filterlash
Invoke-RestMethod -Uri "http://localhost:3004/api/products?category=Selofan" -Method GET

# Qidiruv
Invoke-RestMethod -Uri "http://localhost:3004/api/products?search=paket" -Method GET
```

#### Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:3004/api/health" -Method GET
```

#### Order Test
```powershell
$orderData = @{
    products = @(
        @{
            id = "product_id_here"
            name = "Test Product"
            size = "20x30 sm"
            price = 500
            quantity = 2
        }
    )
    customer = @{
        name = "Test User"
        phone = "+998901234567"
        email = "test@example.com"
    }
    delivery = @{
        address = "Test Address"
        city = "Toshkent"
        region = "Toshkent viloyati"
    }
    payment = @{
        method = "cash"
    }
}

$jsonData = $orderData | ConvertTo-Json -Depth 3
Invoke-RestMethod -Uri "http://localhost:3004/api/orders" -Method POST -Body $jsonData -ContentType "application/json"
```

### cURL Commands (Git Bash yoki WSL'da)

#### Products
```bash
# GET products
curl -X GET http://localhost:3004/api/products

# GET with category filter
curl -X GET "http://localhost:3004/api/products?category=Selofan"

# GET with search
curl -X GET "http://localhost:3004/api/products?search=paket"
```

#### Contact Form
```bash
curl -X POST http://localhost:3004/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "phone": "+998901234567",
    "message": "Test message"
  }'
```

## Frontend Testing

### Manual Tests
1. **Homepage Loading** - http://localhost:3000
2. **Products Page** - http://localhost:3000/products
3. **Cart Functionality** - Mahsulot qo'shish/o'chirish
4. **Order Form** - Buyurtma berish jarayoni
5. **Contact Form** - Aloqa formasi
6. **Responsive Design** - Mobil/Tablet ko'rinishi

### Browser Console Tests
```javascript
// API Connection Test
fetch('/api/products')
  .then(res => res.json())
  .then(data => console.log('Products loaded:', data.products.length));

// LocalStorage Test  
localStorage.setItem('test', 'working');
console.log('LocalStorage:', localStorage.getItem('test'));
```

## Performance Testing

### Lighthouse (Chrome DevTools)
1. F12 > Lighthouse
2. Generate report
3. Tekshirish kerak:
   - Performance > 90
   - Accessibility > 95
   - Best Practices > 90
   - SEO > 90

### Network Testing
```bash
# Backend response time
curl -w "@curl-format.txt" -s -o /dev/null http://localhost:3004/api/products
```

curl-format.txt fayli:
```
     time_namelookup:  %{time_namelookup}s\n
        time_connect:  %{time_connect}s\n
     time_appconnect:  %{time_appconnect}s\n
    time_pretransfer:  %{time_pretransfer}s\n
       time_redirect:  %{time_redirect}s\n
  time_starttransfer:  %{time_starttransfer}s\n
                     ----------\n
          time_total:  %{time_total}s\n
```

## Error Testing

### Invalid Data Tests
```powershell
# Invalid phone number
$invalidOrder = @{
    customer = @{
        name = "Test"
        phone = "invalid-phone"
    }
}
Invoke-RestMethod -Uri "http://localhost:3004/api/orders" -Method POST -Body ($invalidOrder | ConvertTo-Json) -ContentType "application/json"
```

### Rate Limiting Test
```bash
# 100+ requests in 15 minutes
for i in {1..105}; do
  curl http://localhost:3004/api/products > /dev/null 2>&1
  echo "Request $i"
done
```

## Database Testing

### MongoDB Queries
```javascript
// MongoDB shell'da
use paket-uzb

// Products count
db.products.countDocuments()

// Orders today
db.orders.find({
  "timestamps.orderDate": {
    $gte: new Date(new Date().setHours(0,0,0,0))
  }
}).count()

// Top selling products
db.orders.aggregate([
  {$unwind: "$products"},
  {$group: {
    _id: "$products.name",
    totalSold: {$sum: "$products.quantity"}
  }},
  {$sort: {totalSold: -1}},
  {$limit: 5}
])
```

## Load Testing

### Artillery.js (Optional)
```yaml
# artillery-config.yml
config:
  target: 'http://localhost:3004'
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: "API Load Test"
    requests:
      - get:
          url: "/api/products"
      - get:
          url: "/api/products?category=Selofan"
```

```bash
npm install -g artillery
artillery run artillery-config.yml
```

## Expected Results

### API Response Times
- Products GET: < 200ms
- Order POST: < 500ms
- Contact POST: < 300ms

### Frontend Load Times
- Initial Load: < 3s
- Route Changes: < 1s
- API Calls: < 2s

### Error Handling
- Invalid data: 400 responses
- Rate limiting: 429 responses
- Server errors: 500 responses with proper messages

---

**Eslatma**: Test qilishdan oldin server ishlab turganligiga ishonch hosil qiling!
