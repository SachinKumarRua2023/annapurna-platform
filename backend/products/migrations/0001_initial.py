# Generated migration for products app
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField(unique=True)),
                ('description', models.TextField(blank=True)),
                ('image', models.ImageField(blank=True, upload_to='categories/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('slug', models.SlugField(unique=True)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('compare_price', models.DecimalField(decimal_places=2, max_digits=10, null=True, blank=True)),
                ('cost_price', models.DecimalField(decimal_places=2, max_digits=10, null=True, blank=True)),
                ('sku', models.CharField(max_length=100, unique=True)),
                ('track_inventory', models.BooleanField(default=True)),
                ('inventory_quantity', models.PositiveIntegerField(default=0)),
                ('weight', models.DecimalField(decimal_places=2, max_digits=8, null=True, blank=True)),
                ('dimensions', models.CharField(blank=True, max_length=100)),
                ('image', models.ImageField(upload_to='products/')),
                ('images', models.JSONField(blank=True, default=list)),
                ('featured', models.BooleanField(default=False)),
                ('bestseller', models.BooleanField(default=False)),
                ('status', models.CharField(choices=[('draft', 'Draft'), ('active', 'Active'), ('archived', 'Archived')], default='draft', max_length=20)),
                ('meta_title', models.CharField(blank=True, max_length=200)),
                ('meta_description', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.SET_NULL, null=True, to='products.category')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.IntegerField(choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')]),),
                ('title', models.CharField(blank=True, max_length=100)),
                ('content', models.TextField()),
                ('verified', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='products.product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.user')),
            ],
        ),
    ]
