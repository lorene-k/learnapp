FROM    python:3.14-slim

WORKDIR /backend

COPY    requirements.txt .

RUN     pip install --no-cache-dir -r requirements.txt

COPY    . .

EXPOSE  8000

CMD     ["sh", "-c", "\
        if [ \"$ENV\" = \"dev\" ]; then \
            uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload; \
        else \
            uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4; \
            fi"]