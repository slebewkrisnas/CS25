import os

def build():
    print("Building jasaku_interactive_prototype.html...")
    
    # Read logo base64
    logo_base64 = ""
    if os.path.exists('scripts/logo_base64.txt'):
        with open('scripts/logo_base64.txt', 'r', encoding='utf-8') as f:
            logo_base64 = f.read().strip()
    
    # Read css
    with open('src/styles.css', 'r', encoding='utf-8') as f:
        styles_css = f.read()

    # Read js files
    with open('src/icons.js', 'r', encoding='utf-8') as f:
        icons_js = f.read()

    with open('src/state.js', 'r', encoding='utf-8') as f:
        state_js = f.read()

    with open('src/customer_views.js', 'r', encoding='utf-8') as f:
        customer_views_js = f.read()

    with open('src/admin_views.js', 'r', encoding='utf-8') as f:
        admin_views_js = f.read()

    with open('src/app_controller.js', 'r', encoding='utf-8') as f:
        app_controller_js = f.read()

    html_template = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>JASAKU — Prototipe Aplikasi Layanan Jasa & Admin Panel</title>
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Google Fonts: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <!-- Tailwind Config for Official JASAKU Palette -->
  <script>
    tailwind.config = {{
      theme: {{
        extend: {{
          fontFamily: {{
            sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
          }},
          colors: {{
            cs: {{
              tealDark: '#16627A',
              teal: '#1D7C93',
              tealLight: '#2CA5B8',
              tealSoft: '#E7F4F7',
              orange: '#EE7A34',
              orangeLight: '#F59A23',
              orangeSoft: '#FFF3E8',
              ink: '#0E2A35',
              bg: '#F4F8FA'
            }},
            jasaku: {{
              teal: '#16627A',
              tealDark: '#0F495B',
              tealLight: '#2087A7',
              tealSoft: '#E8F4F8',
              orange: '#EE7A34',
              orangeLight: '#F98F4E',
              orangeSoft: '#FFF3EB',
              charcoal: '#161717',
              body: '#334155',
              surface: '#F8FAFC',
              safe: '#10B981',
              warning: '#F59E0B',
              danger: '#EF4444'
            }}
          }},
          boxShadow: {{
            'card': '0 4px 20px -4px rgba(22, 98, 122, 0.08)',
            'nav': '0 -6px 24px -6px rgba(14, 42, 53, 0.08)',
            'phone': '0 25px 70px -15px rgba(14, 42, 53, 0.28), 0 0 0 1px rgba(22, 98, 122, 0.08)'
          }}
        }}
      }}
    }}
  </script>
  
  <style>
{styles_css}
  </style>
</head>
<body class="bg-[#F1F5F9] text-[#161717] min-h-screen">

  <!-- Root Application Container -->
  <div id="root-container"></div>

  <!-- Inlined Official JASAKU Logo Asset -->
  <script>
    window.JASAKU_LOGO_BASE64 = "{logo_base64}";
  </script>

  <!-- Script Modules -->
  <script>
{icons_js}
  </script>

  <script>
{state_js}
  </script>

  <script>
{customer_views_js}
  </script>

  <script>
{admin_views_js}
  </script>

  <script>
{app_controller_js}
  </script>

</body>
</html>
"""

    output_path = 'index.html'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_template)
    file_size = os.path.getsize(output_path)
    print(f"SUCCESS: Built {output_path} ({file_size} bytes)")

if __name__ == '__main__':
    build()
